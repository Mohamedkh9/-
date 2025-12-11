export enum CalculationMode {
  ADD = 'add',
  SUBTRACT = 'subtract'
}

export interface CalculationResult {
  net: number;
  vat: number;
  gross: number;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  vatRate: number;
}
