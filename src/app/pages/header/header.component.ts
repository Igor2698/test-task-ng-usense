import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  rates: any;
  currencies = ['USD', 'EUR', 'UAH'];
  selectedCurrency: string = 'USD'; // Add a default selected currency

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.updateRates(this.selectedCurrency);
  }

  updateRates(currency: string): void {
    this.currencyService.getRates(currency).subscribe((data) => {
      this.rates = data.rates;
    });
  }

  onCurrencyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCurrency = selectElement.value;
    this.updateRates(this.selectedCurrency);
  }
}
