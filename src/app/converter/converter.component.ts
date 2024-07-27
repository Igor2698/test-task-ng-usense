import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  amount1!: number;
  amount2!: number;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  rates: any;
  currencies = ['USD', 'EUR', 'UAH'];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates().subscribe((data) => {
      this.rates = data.rates;
    });
  }

  convert(): void {
    const rate1 = this.rates[this.currency1];
    const rate2 = this.rates[this.currency2];
    this.amount2 = (this.amount1 / rate1) * rate2;
  }

  reverseConvert(): void {
    const rate1 = this.rates[this.currency1];
    const rate2 = this.rates[this.currency2];
    this.amount1 = (this.amount2 / rate2) * rate1;
  }
}
