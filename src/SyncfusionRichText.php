<?php

declare(strict_types=1);

namespace ThibautGobert\FilamentSyncfusionRichText;

use Closure;
use Filament\Forms\Components\Concerns\HasPlaceholder;
use Filament\Forms\Components\Field;
use Filament\Support\Concerns\HasExtraAlpineAttributes;
use Illuminate\Support\Collection;
use Livewire\Component;

class SyncfusionRichText extends Field
{
    use HasExtraAlpineAttributes;
    use HasPlaceholder;

    protected string $view = 'filament-syncfusion-rich-text::components.filament-syncfusion-rich-text';

    protected int | Closure | null $cols = null;

    protected int | Closure | null $rows = null;

    protected bool | Closure $shouldAutosize = false;

    protected string $syncfusionLicenseKey = '';

    protected ?string $mode = null;
    protected ?array $toolbarItems = null;
    protected ?array $emojiPickerSettings = null;

    protected ?array $insertImageSettings = null;
    protected ?array $insertVideoSettings = null;

    protected ?string $height = '16rem';

    protected ?bool $useBootstrap5ForStylingContent = null;

    protected function setUp(): void
    {
        parent::setUp();

        $this->initializeConfigurations();

        $this->afterStateHydrated(function (SyncfusionRichText $component, string | array | null $state): void {
            if (!$state) {
                return;
            }

            $component->state($state);
        });


        $this->afterStateUpdated(function (SyncfusionRichText $component, Component $livewire): void {
            $livewire->validateOnly($component->getStatePath());
        });

    }

    protected function initializeConfigurations(): void
    {
        $this->syncfusionLicenseKey = config('filament-syncfusion-rich-text.syncfusionLicenseKey');
    }

    public function getSyncfusionLicenseKey()
    {
        return $this->syncfusionLicenseKey;
    }

    public function toolbarItems(?array $items)
    {
        $this->toolbarItems = $items;
        return $this;
    }

    public function getToolbarItems()
    {
        return $this->toolbarItems ??
            $this->getMode() === 'HTML'
                ? config('filament-syncfusion-rich-text.defaultToolbarItems')
                : config('filament-syncfusion-rich-text.defaultMarkDownToolbarItems');
    }

    public function mode(string $mode = 'HTML')
    {
        $this->mode = $mode;
        return $this;
    }

    public function getMode(): string
    {
        return $this->mode ?? config('filament-syncfusion-rich-text.mode');
    }

    public function useBootstrap5ForStylingContent(bool $useBootstrap5ForStylingContent = false)
    {
        $this->useBootstrap5ForStylingContent = $useBootstrap5ForStylingContent;
        return $this;
    }
     public function getUseBootstrap5ForStylingContent()
    {
        return $this->useBootstrap5ForStylingContent ?? config('filament-syncfusion-rich-text.use-bootstrap5-for-styling-content');

    }

    public function insertImageSettings(?array $config)
    {
        $this->insertImageSettings = $config;
        return $this;
    }

    public function getInsertImageSettings()
    {
        return $this->insertImageSettings ?? config('filament-syncfusion-rich-text.insertImageSettings');
    }

    public function insertVideoSettings(?array $config)
    {
        $this->insertVideoSettings = $config;
        return $this;
    }

    public function getInsertVideoSettings()
    {
        return $this->insertVideoSettings ?? config('filament-syncfusion-rich-text.insertVideoSettings');
    }

    public function emojiPickerSettings(?array $config)
    {
        $this->emojiPickerSettings = $config;
        return $this;
    }

    public function getEmojiPickerSettings()
    {
        return $this->emojiPickerSettings ?? config('filament-syncfusion-rich-text.emojiPickerSettings');
    }

    public function height(string $height): static
    {
        $this->height = $height;
        return $this;
    }

    public function getHeight(): ?string
    {
        return $this->height;
    }

    public function autosize(bool | Closure $condition = true): static
    {
        $this->shouldAutosize = $condition;

        return $this;
    }

    public function cols(int | Closure | null $cols): static
    {
        $this->cols = $cols;

        return $this;
    }

    public function rows(int | Closure | null $rows): static
    {
        $this->rows = $rows;

        return $this;
    }

    public function getCols()
    {
        return $this->evaluate($this->cols);
    }

    public function getRows()
    {
        return $this->evaluate($this->rows);
    }

    public function shouldAutosize(): bool
    {
        return (bool) $this->evaluate($this->shouldAutosize);
    }
}
