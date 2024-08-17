interface CurrencyData {
    code: string;
    value: number;
}

export interface ExchangeRates {
    meta: {
        last_updated_at: string;
    };
    data: {
        [key: string]: CurrencyData;
    };
}