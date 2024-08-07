# Filament Syncfusion Rich Text


Syncfusion Rich Text Editor Field for Laravel Filament Form.

## Warning
Before going further you must know that Syncfusion is not a free library, you must have a valid license to use it.  
They also have a community license.  
[Get your license here](https://www.syncfusion.com/sales/teamlicense)  
Once you have your license, you can set the key in your .env file.  
```
SYNCFUSION_LICENSE_KEY=your-license-key
```

## Features

- Easily insert images with Base64 saveFormat option
- Advanced images insert with Blob saveFormat option and your own server side implementation
- Easily insert videos with Base64 saveFormat option
- Advanced videos insert with Blob saveFormat option and your own server side implementation
- Code editor (Code mirror 6 implementation) through ```SourceCode``` toolbar item
- Full screen editor through ```FullScreen``` toolbar item
- HTML or Markdown mode
- Dark / Light theme support


## Installation

You can install the package via composer:

```bash
composer require thibautgobert/filament-syncfusion-rich-text
```
## Usage

```php
use ThibautGobert\FilamentSyncfusionRichText\SyncfusionRichText;

public function form(Form $form): Form
{
    return $form
        ->schema([
            ...
             SyncfusionRichText::make('content')
                    ->mode('Markdown')
                    ->required()
                    ->columnSpanFull(),
        ])

}
```

##### Available methods
| Method              | Type   | Params               | Default                                            | Info                                                                                                        |
|:--------------------|:-------|:---------------------|:---------------------------------------------------|:------------------------------------------------------------------------------------------------------------|
| mode                | string | 'HTML' / 'Markdown'  | 'HTML'                                             | Set editor mode                                                                                             |
| toolbarItems        | array  | array                | config('syncfusion-rich-text.defaultToolbarItems') | Set available toolbar items                                                                                 |
| insertImageSettings | array  | array                | config('syncfusion-rich-text.insertImageSettings') | Configure image insert (Base 64 or Blob with server side upload)                                            |
| insertVideoSettings | array  | array                | config('syncfusion-rich-text.insertVideoSettings') | Configure video insert (Base 64 or Blob with server side upload)                                            |
| emojiPickerSettings | array  | array                | config('syncfusion-rich-text.emojiPickerSettings') | Configure emoji icons                                                                                       |


## Publishing

You can publish the views using:

```bash
php artisan vendor:publish --tag="syncfusion-rich-text-views"
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag="syncfusion-rich-text-config"
```

##### configuration file

```php
return [
    'syncfusionLicenseKey' => env('SYNCFUSION_LICENSE_KEY'),
    /*
     * HTML / Markdown
     */
    'mode' => 'HTML',
    'defaultToolbarItems' => [
        'Bold',
        'Italic',
        'Underline',
        'FontName',
        'FontSize',
        'FontColor',
        'Formats',
        'Alignments',
        'CreateLink',
        '|',
        'Image',
        'Video',
        '|',
        'Undo',
        'Redo',
        'EmojiPicker',
        '|',
        'CreateTable',
        '|',
        'FullScreen',
        'SourceCode'
    ],
    'defaultMarkDownToolbarItems' => [
        'Bold',
        'Italic',
        'StrikeThrough',
        '|',
        'Formats',
        'OrderedList',
        'UnorderedList',
        '|',
        'CreateLink',
        'Image',
        '|',
        'Undo',
        'Redo',
        '|',
        'CreateTable'
    ],
    'insertImageSettings' => [
        'allowedTypes' =>  [".jpeg", ".jpg", ".png"],
        'display' => 'inline',
        'width' => 'auto',
        'height' => 'auto',
        /*
         * Base64 / Blob
         */
        'saveFormat' => 'Base64',
        'saveUrl' => null,
        'path' => null,
        'serverSideImageResponseName' => 'imageName',
        'deleteUrl' => null,
    ],
    'insertVideoSettings' => [
        'allowedTypes' => ['.mp4', '.mov', '.wmv', '.avi'],
        /*
         *  Inline / Break
         */
        'layoutOption' => 'Inline',
        'width' => 'auto',
        'minWidth' => null,
        'maxWidth' => null,
        'height' => 'auto',
        'minHeight' => null,
        'maxHeight' => null,
        /*
         * Base64 / Blob
         */
        'saveFormat' => 'Base64',
        'saveUrl' => null,
        'removeUrl' => null,
        'path' => null,
        'serverSideVideoResponseName' => 'videoName',
    ],
    'emojiPickerSettings' => [
        'iconsSet' => [
            [
                'name' => 'Smilies & People',
                'code' => '1F600',
                'iconCss' => 'e-emoji',
                'icons' => [
                    ['code' => '1F600', 'desc' => 'Grinning face'],
                    ['code' => '1F603', 'desc' => 'Grinning face with big eyes'],
                    ['code' => '1F604', 'desc' => 'Grinning face with smiling eyes'],
                    ['code' => '1F606', 'desc' => 'Grinning squinting face'],
                    ['code' => '1F605', 'desc' => 'Grinning face with sweat'],
                    ['code' => '1F602', 'desc' => 'Face with tears of joy'],
                    ['code' => '1F923', 'desc' => 'Rolling on the floor laughing'],
                    ['code' => '1F60A', 'desc' => 'Smiling face with smiling eyes'],
                    ['code' => '1F609', 'desc' => 'Winking face'],
                    ['code' => '1F60D', 'desc' => 'Smiling face with heart-eyes'],
                    ['code' => '1F618', 'desc' => 'Face blowing a kiss'],
                    ['code' => '1F61A', 'desc' => 'Kissing face with closed eyes'],
                    ['code' => '1F617', 'desc' => 'Kissing face'],
                    ['code' => '1F619', 'desc' => 'Kissing face with smiling eyes'],
                    ['code' => '1F61B', 'desc' => 'Face with stuck-out tongue'],
                    ['code' => '1F61C', 'desc' => 'Winking face with tongue'],
                    ['code' => '1F92A', 'desc' => 'Zany face'],
                    ['code' => '1F61D', 'desc' => 'Squinting face with tongue'],
                    ['code' => '1F911', 'desc' => 'Money-mouth face'],
                    ['code' => '1F917', 'desc' => 'Hugging face'],
                    ['code' => '1F92D', 'desc' => 'Face with hand over mouth'],
                    ['code' => '1F92B', 'desc' => 'Shushing face'],
                    ['code' => '1F914', 'desc' => 'Thinking face'],
                    ['code' => '1F910', 'desc' => 'Zipper-mouth face'],
                    ['code' => '1F928', 'desc' => 'Face with raised eyebrow'],
                    ['code' => '1F610', 'desc' => 'Neutral face'],
                    ['code' => '1F611', 'desc' => 'Expressionless face'],
                    ['code' => '1F636', 'desc' => 'Face without mouth'],
                    ['code' => '1F60F', 'desc' => 'Smirking face'],
                    ['code' => '1F612', 'desc' => 'Unamused face'],
                    ['code' => '1F644', 'desc' => 'Face with rolling eyes'],
                    ['code' => '1F62C', 'desc' => 'Grimacing face'],
                    ['code' => '1F925', 'desc' => 'Lying face'],
                    ['code' => '1F60C', 'desc' => 'Relieved face'],
                    ['code' => '1F614', 'desc' => 'Pensive face'],
                    ['code' => '1F62A', 'desc' => 'Sleepy face'],
                    ['code' => '1F924', 'desc' => 'Drooling face'],
                    ['code' => '1F634', 'desc' => 'Sleeping face'],
                    ['code' => '1F637', 'desc' => 'Face with medical mask'],
                    ['code' => '1F638', 'desc' => 'Grinning cat face with smiling eyes'],
                    ['code' => '1F639', 'desc' => 'Cat face with tears of joy'],
                    ['code' => '1F63A', 'desc' => 'Smiling cat face with open mouth'],
                    ['code' => '1F63B', 'desc' => 'Smiling cat face with heart-eyes'],
                    ['code' => '1F92E', 'desc' => 'Face vomiting']
                ],
            ],
            [
                'name' => 'Animals & Nature',
                'code' => '1F435',
                'iconCss' => 'e-animals',
                'icons' => [
                    ['code' => '1F436', 'desc' => 'Dog face'],
                    ['code' => '1F431', 'desc' => 'Cat face'],
                    ['code' => '1F42D', 'desc' => 'Mouse face'],
                    ['code' => '1F439', 'desc' => 'Hamster face'],
                    ['code' => '1F430', 'desc' => 'Rabbit face'],
                    ['code' => '1F98A', 'desc' => 'Fox face'],
                ],
            ],
            [
                'name' => 'Food & Drink',
                'code' => '1F347',
                'iconCss' => 'e-food-and-drinks',
                'icons' => [
                    ['code' => '1F34E', 'desc' => 'Red apple'],
                    ['code' => '1F34C', 'desc' => 'Banana'],
                    ['code' => '1F347', 'desc' => 'Grapes'],
                    ['code' => '1F353', 'desc' => 'Strawberry'],
                    ['code' => '1F35E', 'desc' => 'Bread'],
                    ['code' => '1F950', 'desc' => 'Croissant'],
                    ['code' => '1F955', 'desc' => 'Carrot'],
                    ['code' => '1F354', 'desc' => 'Hamburger'],
                ],
            ],
            [
                'name' => 'Activities',
                'code' => '1F383',
                'iconCss' => 'e-activities',
                'icons' => [
                    ['code' => '26BD', 'desc' => 'Soccer ball'],
                    ['code' => '1F3C0', 'desc' => 'Basketball'],
                    ['code' => '1F3C8', 'desc' => 'American football'],
                    ['code' => '26BE', 'desc' => 'Baseball'],
                    ['code' => '1F3BE', 'desc' => 'Tennis'],
                    ['code' => '1F3D0', 'desc' => 'Volleyball'],
                    ['code' => '1F3C9', 'desc' => 'Rugby football'],
                ],
            ],
            [
                'name' => 'Travel & Places',
                'code' => '1F30D',
                'iconCss' => 'e-travel-and-places',
                'icons' => [
                    ['code' => '2708', 'desc' => 'Airplane'],
                    ['code' => '1F697', 'desc' => 'Automobile'],
                    ['code' => '1F695', 'desc' => 'Taxi'],
                    ['code' => '1F6B2', 'desc' => 'Bicycle'],
                    ['code' => '1F68C', 'desc' => 'Bus'],
                ],
            ],
            [
                'name' => 'Objects',
                'code' => '1F507',
                'iconCss' => 'e-objects',
                'icons' => [
                    ['code' => '1F4A1', 'desc' => 'Light bulb'],
                    ['code' => '1F526', 'desc' => 'Flashlight'],
                    ['code' => '1F4BB', 'desc' => 'Laptop computer'],
                    ['code' => '1F5A5', 'desc' => 'Desktop computer'],
                    ['code' => '1F5A8', 'desc' => 'Printer'],
                    ['code' => '1F4F7', 'desc' => 'Camera'],
                    ['code' => '1F4F8', 'desc' => 'Camera with flash'],
                    ['code' => '1F4FD', 'desc' => 'Film projector'],
                ],
            ],
            [
                'name' => 'Symbols',
                'code' => '1F3E7',
                'iconCss' => 'e-symbols',
                'icons' => [
                    ['code' => '274C', 'desc' => 'Cross mark'],
                    ['code' => '2714', 'desc' => 'Check mark'],
                    ['code' => '26A0', 'desc' => 'Warning sign'],
                    ['code' => '1F6AB', 'desc' => 'Prohibited'],
                    ['code' => '2139', 'desc' => 'Information'],
                    ['code' => '267B', 'desc' => 'Recycling symbol'],
                    ['code' => '1F6AD', 'desc' => 'No smoking'],
                ],
            ],
        ],
    ],
];
```
## Exemples

### Image insert (Blob), server side implementation exemple
```php
//config file
'insertImageSettings' => [
        'allowedTypes' =>  [".jpeg", ".jpg", ".png"],
        'display' => 'inline',
        'width' => 'auto',
        'height' => 'auto',
        /*
         * Base64 / Blob
         */
        'saveFormat' => 'Blob',
        'saveUrl' => '/admin/image/save',
        'path' => '/storage/images/rich-text/',
        'serverSideImageResponseName' => 'imageName',
        'deleteUrl' => '/admin/image/remove',

    ],
```

```php
//routes
<?php

use App\Http\Controllers\Admin\ImageController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'admin/image'], function () {
    Route::post('save', [ImageController::class, 'save']);
    Route::post('remove', [ImageController::class, 'remove']);
});

```
```php
//controller
class ImageController extends Controller
{
    public function save(Request $request)
    {
        $path = Storage::disk('public')->putFile('images/rich-text', $request->file('UploadFiles'));
        $fileName = basename($path);

        return response()->json([
            // the key must match serverSideImageResponseName from the config file
            'imageName' => $fileName,
        ]);
    }

    public function remove(Request $request)
    {
        Storage::disk('public')->delete(str_replace('/storage', '', $request->input('url')));
        return response()->json('ok');
    }
}

```

## Changelog

Please see [CHANGELOG](CHANGELOG.md)

## Credits

- [Thibaut Gobert](https://github.com/ThibautGobert)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
