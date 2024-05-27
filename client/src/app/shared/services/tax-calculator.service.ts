import { Injectable } from '@angular/core';

export interface Country {
  [key: string]: {
    name: string;
    vat: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TaxCalculatorService {
  readonly countries: Country = Object.freeze({
    ua: { name: 'Ukraine', vat: 20 },
    at: { name: 'Austria', vat: 20 },
    de: { name: 'Germany', vat: 20 },
    uk: { name: 'United Kingdom', vat: 20 },
    pl: { name: 'Poland', vat: 20 },
  });

  constructor() {}
}
