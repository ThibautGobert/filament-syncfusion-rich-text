import { registerLicense, createElement } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, Video, HtmlEditor, QuickToolbar, MarkdownEditor, Table, EmojiPicker } from '@syncfusion/ej2-richtexteditor';
import { EditorState } from "@codemirror/state";
import {EditorView, keymap, lineNumbers} from "@codemirror/view";
import {oneDark} from "@codemirror/theme-one-dark";
import { html } from "@codemirror/lang-html";
import { autocompletion } from "@codemirror/autocomplete";
import {indentWithTab} from "@codemirror/commands"
import { expandAbbreviation } from '@emmetio/codemirror6-plugin';
import { marked } from 'marked';
RichTextEditor.Inject(Toolbar, Link, Image, Video, HtmlEditor, QuickToolbar, MarkdownEditor, Table, EmojiPicker);

export default function syncfusionRichTextComponent({
    state,
    statePath,
    placeholder,
    syncfusionLicenseKey,
    mode,
    toolbarItems,
    insertImageSettings,
    insertVideoSettings,
    emojiPickerSettings,
    height,
}) {
    return {
        state,
        statePath,
        placeholder,
        editor: null,
        observer: null,
        darkThemeLink: null,
        lightThemeLink: null,
        myCodeMirror: null,
        mdSource: null,
        htmlPreview: null,
        textArea: null,
        async init() {
            registerLicense(syncfusionLicenseKey)
            this.initEditor()
            this.applyInitialTheme()
            this.observeDarkModeChanges()
        },
        actionCompleteHandler(e) {
            if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
                this.editor.sourceCodeModule.getPanel().style.display = 'none';
                this.mirrorConversion(e);
                return
            }
            else {
                setTimeout(()=> {
                    this.editor.toolbarModule.refreshToolbarOverflow();
                }, 400);
            }
            this.updateContent()
        },
        applyInitialTheme() {
            this.lightThemeLink = document.querySelector('link[href*="filament-syncfusion-rich-text-light.css"]')?.getAttribute('href')
            this.darkThemeLink = document.querySelector('link[href*="filament-syncfusion-rich-text-dark.css"]')?.getAttribute('href')
            this.setTheme();
        },
        fullPreview(e) {
            let id = this.editor.getID() + 'html-preview';
            this.htmlPreview = this.editor.element.querySelector('#' + id);
            if (this.mdSource.classList.contains('e-active')) {
                this.mdSource.classList.remove('e-active');
                this.mdSource.parentElement.title = 'Preview';
                this.textArea.style.display = 'block';
                this.textArea.style.width = '100%';
                this.htmlPreview.style.display = 'none';
            } else {
                this.mdSource.classList.add('e-active');
                if (!this.htmlPreview) {
                    this.htmlPreview = createElement('div', {className: 'e-content'});
                    this.htmlPreview.id = id;
                    this.textArea.parentNode.appendChild(this.htmlPreview);
                }
                if (e.type === 'preview') {
                    this.textArea.style.display = 'none';
                    this.htmlPreview.classList.add('e-pre-source');
                } else {
                    this.htmlPreview.classList.remove('e-pre-source');
                    this.textArea.style.width = '50%';
                }
                this.htmlPreview.style.display = 'block';
                this.markDownConversion();
                this.mdSource.parentElement.title = 'Code View';
            }
        },
        initEditor() {
            let items = toolbarItems
            if(mode === 'Markdown') {
               items = [...items, { tooltipText: 'Preview', template: '<div class="preview-code e-tbar-btn e-control e-btn e-icon-btn">' +
                       '<span class="e-btn-icon e-preview e-icons"></span></div>'}]
            }
            this.editor = new RichTextEditor({
                height: 'auto',
                value: this.state,
                editorMode: mode,
                insertImageSettings : insertImageSettings,
                insertVideoSettings : insertVideoSettings,
                toolbarSettings: {
                    type: 'MultiRow',
                    items: items
                },
                emojiPickerSettings: emojiPickerSettings,
                afterImageDelete: async (args) => {
                    let metaTag = document.querySelector('meta[name="csrf-token"]');
                    let token = metaTag ? metaTag.getAttribute('content') : '';
                    try {
                        let res = await fetch(insertImageSettings.deleteUrl, {
                            method: 'POST', // Méthode HTTP
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                _token: token,
                                url: args.src
                            })
                        })
                    }catch (e) {
                        console.log('Error while removing image', e)
                    }
                },
                afterMediaDelete: async(args) => {
                    let metaTag = document.querySelector('meta[name="csrf-token"]');
                    let token = metaTag ? metaTag.getAttribute('content') : '';
                    try {
                        let res = await fetch(insertVideoSettings.deleteUrl, {
                            method: 'POST', // Méthode HTTP
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                _token: token,
                                url: args.src
                            })
                        })
                    }catch (e) {
                        console.log('Error while removing media', e)
                    }
                },
                imageUploading: (args) => {
                    let metaTag = document.querySelector('meta[name="csrf-token"]');
                    let token = metaTag ? metaTag.getAttribute('content') : '';
                    let additionalData = { _token: token };
                    args.customFormData = [additionalData];
                },
                fileUploading: (args) => {
                    let metaTag = document.querySelector('meta[name="csrf-token"]');
                    let token = metaTag ? metaTag.getAttribute('content') : '';
                    let additionalData = { _token: token };
                    args.customFormData = [additionalData];
                },
                //https://ej2.syncfusion.com/documentation/rich-text-editor/how-to/rename-images-in-server
                imageUploadSuccess: (args) => {
                    let response = JSON.parse(args.e.currentTarget.response)
                    if(response && response[insertImageSettings.serverSideImageResponseName]) {
                        args.file.name = response[insertImageSettings.serverSideImageResponseName]
                        let filename= document.querySelectorAll(".e-file-name")[0];
                        filename.innerHTML = args.file.name.replace(document.querySelectorAll(".e-file-type")[0].innerHTML, '');
                        filename.title = args.file.name;
                    }
                },
                fileUploadSuccess: (args) => {
                    let response = JSON.parse(args.e.currentTarget.response)
                    if(response && response[insertVideoSettings.serverSideVideoResponseName]) {
                        args.file.name = response[insertVideoSettings.serverSideVideoResponseName]
                        let filename= document.querySelectorAll(".e-file-name")[0];
                        filename.innerHTML = args.file.name.replace(document.querySelectorAll(".e-file-type")[0].innerHTML, '');
                        filename.title = args.file.name;
                    }
                },
                change: (args) => {
                    this.state = args.value
                },
                actionBegin: (e)=> this.updateContent(),
                actionComplete: (e)=> this.actionCompleteHandler(e),
                created: ()=> {
                    if(mode === 'Markdown') {
                        this.textArea = this.editor.contentModule.getEditPanel();
                        this.textArea.addEventListener('keyup', (e) => { this.markDownConversion() })
                        this.mdSource = this.$refs.syncfusionRichText.querySelector('.preview-code');
                        this.mdSource.addEventListener('click', (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.fullPreview({mode: true, type: 'preview'});
                            if (e.currentTarget.classList.contains('e-active')) {
                                this.editor.disableToolbarItem(toolbarItems);
                            } else {
                                this.editor.enableToolbarItem(toolbarItems);
                            }
                        })
                    }
                },
            })
            this.editor.appendTo(this.$refs.syncfusionRichText.querySelector('.content'))
        },
        markDownConversion() {
            if (this.mdSource.classList.contains('e-active')) {
                let id = this.editor.getID() + 'html-preview';
                this.htmlPreview = this.editor.element.querySelector('#' + id);
                let rteElement = this.editor.contentModule.getEditPanel();
                //let rteValue = rteElement.value;
                this.htmlPreview.innerHTML = marked((this.editor.contentModule.getEditPanel()).value);
            }
        },
        mirrorConversion(e) {
            let textArea = this.editor.contentModule.getEditPanel();
            let id = this.editor.getID() +  'mirror-view';
            let mirrorView = this.editor.element.parentNode.querySelector('#' + id)
            if (e.targetItem === 'Preview') {
                textArea.style.display = 'block'
                mirrorView.style.display = 'none'
                let content = this.myCodeMirror.state.doc.toString()
                textArea.innerHTML = content
                this.state = content
            } else {
                if (!mirrorView) {
                    mirrorView = document.createElement('div', { className: 'e-content' });
                    mirrorView.id = id;
                    textArea.parentNode.appendChild(mirrorView);
                } else {
                    mirrorView.innerHTML = '';
                }
                textArea.style.display = 'none';
                mirrorView.style.display = 'block';
                let content = this.editor?.getHtml() || this.state
                this.renderCodeMirror(mirrorView, content);
            }
        },
        renderCodeMirror(mirrorView, content) {
            this.myCodeMirror = new EditorView({
                state: EditorState.create({
                    doc: content,
                    extensions: [
                        EditorView.lineWrapping,
                        autocompletion(),
                        html(),
                        lineNumbers(),
                        oneDark,
                        keymap.of([indentWithTab]),
                        keymap.of([{
                            key: 'Mod-e',
                            run: expandAbbreviation,
                            preventDefault: true
                        }]),
                    ],
                }),
                parent: mirrorView,
            });
        },
        observeDarkModeChanges() {
            const targetElement = document.querySelector('html');
            this.observer = new MutationObserver(() => {
                this.setTheme()
            });
            this.observer.observe(targetElement, { attributes: true, attributeFilter: ['class'] });
        },
        setTheme() {
            const isDarkMode = !!document.querySelector('html').classList.contains('dark');
            if(isDarkMode) {
                document.querySelector(`link[href*="${this.lightThemeLink}"]`)?.remove()
                if(this.darkThemeLink) {
                    let file = document.createElement('link');
                    file.rel = 'stylesheet';
                    file.href = this.darkThemeLink
                    document.head.appendChild(file)
                }
                return
            }

            document.querySelector(`link[href*="${this.darkThemeLink}"]`)?.remove()
            if(this.lightThemeLink) {
                let file = document.createElement('link');
                file.rel = 'stylesheet';
                file.href = this.lightThemeLink
                document.head.appendChild(file)
            }

        },
        updateContent (){
            setTimeout(()=> {
                this.state = this.editor?.getHtml()
            }, 200)
        }
    }
}
