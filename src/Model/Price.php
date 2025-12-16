<?php

namespace App\Model;

class Price
{
    private float $amount;
    private string $currencyLabel;
    private string $currencySymbol;

    public function __construct(array $data)
    {
        $this->amount = (float) $data['amount'];
        $this->currencyLabel = $data['currency_label'] ?? 'USD';
        $this->currencySymbol = $data['currency_symbol'] ?? '$';
    }

    public function getAmount(): float
    {
        return $this->amount;
    }

    public function getCurrencyLabel(): string
    { 
        return $this->currencyLabel;
    }

    public function getCurrencySymbol(): string
    {
        return $this->currencySymbol;
    }

    public function toArray(): array
    {
        return [
            'amount' => $this->amount,
            'currency' => [
                'label' => $this->currencyLabel,
                'symbol' => $this->currencySymbol,
            ],
        ];
    }
}