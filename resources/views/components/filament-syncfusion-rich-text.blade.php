{{--
@php
    $isConcealed = $isConcealed();
    $rows = $getRows();
    $shouldAutosize = $shouldAutosize();
@endphp
--}}
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <x-slot
        name="label"
        @class([
            'sm:pt-1.5' =>  $hasInlineLabel(),
        ])
    >
        {{ $getLabel() }}
    </x-slot>
    <div
        @class([
            'syncfusion-rich-text-wrapper',
            'focus-within:ring-0' => $isDisabled(),
            'base' => !$errors->has($getStatePath()),
            'danger' => $errors->has($getStatePath()),
        ])>

        <div
            wire:ignore
            x-ignore
            ax-load
            ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('filament-syncfusion-rich-text', 'thibautgobert/filament-syncfusion-rich-text') }}"
            x-data="syncfusionRichTextComponent({
                state: $wire.{{ $applyStateBindingModifiers("entangle('{$getStatePath()}')", isOptimisticallyLive: false) }},
                statePath: '{{ $getStatePath() }}',
                syncfusionLicenseKey: @js($getSyncfusionLicenseKey()),
                mode: @js($getMode()),
                toolbarItems: @js($getToolbarItems()),
                insertImageSettings: @js($getInsertImageSettings()),
                insertVideoSettings: @js($getInsertVideoSettings()),
                emojiPickerSettings: @js($getEmojiPickerSettings()),
                height: @js($getHeight()),
            })"
            x-ref="syncfusionRichText"
            style="min-height: {{ $getHeight() }};"
            class="syncfusion-rich-text"
        >
            <textarea class="content {{$getUseBootstrap5ForStylingContent() ? 'bootstrap' : ''}}"></textarea>
        </div>
    </div>
</x-dynamic-component>
