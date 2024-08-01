import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CurrencySelectComponent } from '../../components/custom-select/custom-select.component';

@Component({
  selector: 'app-converter',
  standalone: true,
  templateUrl: './converter.component.html',
  imports: [FormsModule, CurrencySelectComponent, CustomInputComponent],

  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {
  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  rates: any = {};
  currencies: string[] = ['USD', 'EUR', 'UAH'];

  private amount1Subject = new Subject<number>();
  private amount2Subject = new Subject<number>();
  private currency1Subject = new Subject<string>();
  private currency2Subject = new Subject<string>();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currency1Subject
      .pipe(switchMap((currency) => this.currencyService.getRates(currency)))
      .subscribe((data) => {
        this.rates = data.rates;
        this.convert();
      });

    this.currency2Subject
      .pipe(switchMap((currency) => this.currencyService.getRates(currency)))
      .subscribe((data) => {
        this.rates = data.rates;
        this.reverseConvert();
      });

    this.amount1Subject.pipe(debounceTime(300)).subscribe(() => {
      this.convert();
    });

    this.amount2Subject.pipe(debounceTime(300)).subscribe(() => {
      this.reverseConvert();
    });

    // Initial load
    this.currency1Subject.next(this.currency1);
    this.currency2Subject.next(this.currency2);
  }

  onAmount1Change(value: number): void {
    this.amount1 = value;
    this.amount1Subject.next(value);
  }

  onAmount2Change(value: number): void {
    this.amount2 = value;
    this.amount2Subject.next(value);
  }

  onCurrency1Change(value: string): void {
    this.currency1 = value;
    this.currency1Subject.next(value);
  }

  onCurrency2Change(value: string): void {
    this.currency2 = value;
    this.currency2Subject.next(value);
  }

  private convert(): void {
    const rate1 = this.rates[this.currency1];
    const rate2 = this.rates[this.currency2];
    this.amount2 = (this.amount1 / rate1) * rate2;
  }

  private reverseConvert(): void {
    const rate1 = this.rates[this.currency1];
    const rate2 = this.rates[this.currency2];
    this.amount1 = (this.amount2 / rate2) * rate1;
  }
}
