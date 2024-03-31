<?php

namespace ThibautGobert\FilamentSyncfusionRichText;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentIcon;
use Illuminate\Filesystem\Filesystem;
use Livewire\Features\SupportTesting\Testable;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Riodwanto\FilamentAceEditor\Testing\TestsFilamentAceEditor;
use ThibautGobert\FilamentSyncfusionRichText\Testing\TestsFilamentSyncfusionRichText;

class FilamentSyncfusionRichTextServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-syncfusion-rich-text';

    public static string $viewNamespace = 'filament-syncfusion-rich-text';

    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package->name(static::$name)
            ->hasConfigFile()
            ->hasAssets()
            ->hasViews();
    }

    public function packageRegistered(): void
    {
    }

    public function packageBooted(): void
    {
        // Asset Registration
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName()
        );

        FilamentAsset::registerScriptData(
            $this->getScriptData(),
            $this->getAssetPackageName()
        );

        // Icon Registration
        FilamentIcon::register($this->getIcons());

        // Handle Stubs
        if (app()->runningInConsole()) {
            foreach (app(Filesystem::class)->files(__DIR__ . '/../stubs/') as $file) {
                $this->publishes([
                    $file->getRealPath() => base_path("stubs/filament-syncfusion-rich-text/{$file->getFilename()}"),
                ], 'filament-syncfusion-rich-text-stubs');
            }
        }

        // Testing
        Testable::mixin(new TestsFilamentSyncfusionRichText());
    }

    protected function getAssetPackageName(): ?string
    {
        return 'thibautgobert/filament-syncfusion-rich-text';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            AlpineComponent::make('filament-syncfusion-rich-text', __DIR__ . '/../resources/dist/filament-syncfusion-rich-text.js'),
            Css::make('filament-syncfusion-rich-text-base', __DIR__ . '/../resources/dist/filament-syncfusion-rich-text-base.css'),
            Css::make('filament-syncfusion-rich-text-dark', __DIR__ . '/../resources/dist/filament-syncfusion-rich-text-dark.css'),
            Css::make('filament-syncfusion-rich-text-light', __DIR__ . '/../resources/dist/filament-syncfusion-rich-text-light.css'),
        ];
    }

    /**
     * @return array<class-string>
     */
    protected function getCommands(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getIcons(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getRoutes(): array
    {
        return [];
    }

    /**
     * @return array<string, mixed>
     */
    protected function getScriptData(): array
    {
        return [];
    }
}
