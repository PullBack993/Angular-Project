import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  // @ViewChild('contentWrapper') contentWrapper: ElementRef;
  propTransferTax: number = 3.5;
  propSale: number = 2;
  ownershipCoast: number = 1.1;
  mortgageEntry: number = 1.2;
  brokerFee: number = 3.6;
  allowEdit: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  onDblClick($event: MouseEvent): void {
    this.allowEdit = !this.allowEdit;
    let currentNumber = Number((<HTMLTextAreaElement>$event.target).innerHTML);
    // path[]
    let currentValue: string | null = (<HTMLTextAreaElement>$event.target).attributes[1].nodeValue;
    this.setFieldValue(currentValue, currentNumber);
  }

  setFieldValue(fieldName: string | null, currentNumber: number) {
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

  onKeyPress($event: KeyboardEvent) {
    //TODO Bug if don't have any value user can't typ
    let totalLength = (<HTMLTextAreaElement>$event.target).innerHTML.length || 0;

    if (/[0-9]\.[0-9]|[0-9]+|\./gm.test($event.key) == false || totalLength > 3) {
      $event.preventDefault();
    }
  }
}
