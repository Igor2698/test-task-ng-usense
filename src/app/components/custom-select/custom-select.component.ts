import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <select [value]="value" (change)="onSelectChange($event)">
      <option *ngFor="let currency of currencies" [value]="currency">
        {{ currency }}
      </option>
    </select>
  `,
  styleUrls: ['./custom-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencySelectComponent),
      multi: true,
    },
  ],
})
export class CurrencySelectComponent implements ControlValueAccessor {
  @Input() currencies: string[] = [];
  @Input() value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  setValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouch(value);
  }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.setValue(selectElement.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
