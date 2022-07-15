import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  formBuil: FormGroup = this.fb.group({
    buyPrice: new FormControl(200000, [Validators.required]),
    creditDurationMonths: new FormControl(200, [Validators.required, Validators.maxLength(3)]),
    creditDurationYears: new FormControl(20, [Validators.required, Validators.maxLength(2)]),
    ratePercentage: new FormControl(5, [Validators.required, Validators.maxLength(2)]),
    ownPart: new FormControl(50000)
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  checkErrors(controlName: string, sourceGroup: FormGroup) {
   return sourceGroup.controls[controlName]?.errors || !sourceGroup.controls[controlName].hasError
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
      let a = this.setFieldValue(currentValue, currentNumber);
      (<HTMLTextAreaElement>$event.target).textContent = a?.toString() + ' ';

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
    console.log(event);
    console.log(this.formBuil.value.buyPrice);
    console.log(this.formBuil.value.creditDurationMonths);
    console.log(this.formBuil.value.creditDurationYears);
    console.log(this.formBuil.value.ratePercentage);
    console.log(this.formBuil.value.ownPart);

    // let result = sum * (rate + rate / ((1 + rate) ** time - 1)) * time;
    // console.log(Math.floor(result * 100) / 100);
  }
}
