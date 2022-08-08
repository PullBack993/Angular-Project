import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkBuyPrice } from '../../user/util';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  propTransferTax: number = 3.5;
  propSale: number = 2;
  ownershipCoast: number = 1.1;
  mortgageEntry: number = 1.2;
  brokerFee: number = 3.6;
  allowEdit: boolean = false;
  err: boolean = false;
  totalWithTaxValue: string = '7.000';
  totalTax: string = '116778.75'
  monthlyPay: string = '1319.91';
  totalWithTax: string = '316778.75';

  buyPriceControl = new FormControl(200000, [Validators.required]);

  formBuil: FormGroup = this.fb.group({
    buyPrice: this.buyPriceControl,
    creditDurationMonths: new FormControl(240, [Validators.required, Validators.maxLength(3)]),
    creditDurationYears: new FormControl(20, [Validators.required, Validators.maxLength(2)]),
    ratePercentage: new FormControl(5, [Validators.required, Validators.maxLength(2)]),
    ownPart: new FormControl('', [checkBuyPrice(this.buyPriceControl)])
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  checkErrors(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.errors;
  }

  onDblClick($event: MouseEvent): void {
    this.allowEdit = !this.allowEdit;
    let currentNumber = Number((<HTMLTextAreaElement>$event.target).innerHTML);
    let currentValue: string | null = (<HTMLTextAreaElement>$event.target).attributes[1].nodeValue;
    this.setFieldValue(currentValue, currentNumber);
  }

  setFieldValue(fieldName: string | null, currentNumber: number) {
    //TOOD improve if else
    if (fieldName == 'propTransferTax') {
      this.propTransferTax = currentNumber;
      this.totalWithTaxValue = ((this.buyPriceControl.value * this.propTransferTax) / 100)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return this.propTransferTax;
    } else if (fieldName == 'propSale') {
      this.propSale = currentNumber;
      return this.propSale;
    } else if (fieldName == 'ownershipCoast') {
      this.ownershipCoast = currentNumber;
      return this.ownershipCoast;
    } else if (fieldName == 'mortgageEntry') {
      this.mortgageEntry = currentNumber;
      return this.mortgageEntry;
    } else if (fieldName == 'brokerFee') {
      this.brokerFee = currentNumber;
      return this.brokerFee;
    }

    return;
  }

  onBlur($event: FocusEvent) {
    let pattern = /(\d.\d*)?(\d+)/gm;
    let currentNumber: number = 0;
    this.allowEdit = !this.allowEdit;

    let currentNumberValue = (<HTMLTextAreaElement>$event.target).innerHTML;
    let currentValue: string | null = (<HTMLTextAreaElement>$event.target).attributes[1].nodeValue;

    try {
      pattern.exec(currentNumberValue!)![0];
      currentNumber = Number(currentNumberValue);
      let currentField = this.setFieldValue(currentValue, currentNumber);
      (<HTMLTextAreaElement>$event.target).textContent = currentField?.toString() + ' ';

      //set space to avoid blur to close after right arrow push
    } catch (err) {
      this.setFieldValue(currentValue, currentNumber);
      (<HTMLTextAreaElement>$event.target).textContent = '0 ';
    }
  }

  isNumber($event: KeyboardEvent) {
    if (/[0-9]/gm.test($event.key) == false) {
      $event.preventDefault();
    }
  }
  
  onKeyPress($event: KeyboardEvent) {
    //TODO Bug if don't have any value user can't typ
    let totalLength = (<HTMLTextAreaElement>$event.target).innerHTML.length || 0;

    if (/[0-9]\.[0-9]|[0-9]+|\./gm.test($event.key) == false || totalLength > 3) {
      $event.preventDefault();
    }
  }

  onChange(event: Event) {
    let currentFormName = (event.target as HTMLInputElement).attributes[2].nodeValue;
    if (currentFormName === 'creditDurationYears') {
      this.formBuil.patchValue({ creditDurationMonths: this.formBuil.value.creditDurationYears * 12 });
    } else if (currentFormName === 'creditDurationMonths') {
      this.formBuil.patchValue({
        creditDurationYears: Number((this.formBuil.value.creditDurationMonths / 12).toFixed(2))
      });
    }
  }

  onSubmit(event: HTMLElement) {
    let { buyPrice, creditDurationMonths, creditDurationYears, ratePercentage, ownPart } = this.formBuil.value;
    let rate = ratePercentage / 100 / 12;
    let result = buyPrice * (rate + rate / ((1 + rate) ** creditDurationMonths - 1)) * creditDurationMonths;

    this.totalWithTaxValue = ((this.buyPriceControl.value * this.propTransferTax) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    this.totalTax = (result - buyPrice).toFixed(2).toLocaleString();
    this.monthlyPay = (result / creditDurationMonths).toFixed(2).toLocaleString();
    this.totalWithTax = result.toFixed(2).toLocaleString();
  }
}
