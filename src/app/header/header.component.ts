import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  rates: any;
  currencies = ['USD', 'EUR', 'UAH'];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates().subscribe((data) => {
      this.rates = data.rates;
    });
  }
}
