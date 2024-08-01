import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  imports: [NgFor, NgIf],
  standalone: true,
  template: `<input type="number" [value]="value" (input)="onInput($event)" />`,
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() value: number = 0;
  onChange = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
