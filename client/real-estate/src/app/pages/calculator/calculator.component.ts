import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  // @ViewChild('contentWrapper') contentWrapper: ElementRef;
  propTransferTax: number = 3.5;
  allowEdit: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  onDblClick($event: MouseEvent): void {
    this.allowEdit = !this.allowEdit;
    let currentNumber = Number((<HTMLTextAreaElement>$event.target).firstChild?.textContent);
    this.propTransferTax = currentNumber;
  }

  onBlur($event: FocusEvent) {
    let pattern = /(\d.\d*)?(\d+)/gm;
    this.allowEdit = !this.allowEdit;

    let currentValue = (<HTMLTextAreaElement>$event.target).firstChild?.textContent;
    try {
      let num = pattern.exec(currentValue!)![0];
      this.propTransferTax = Number(num);
      //set space to avoid blur to close after right arrow push
      (<HTMLTextAreaElement>$event.target).textContent = this.propTransferTax.toString() + ' ';
    } catch (err) {
      this.propTransferTax = 0;
      (<HTMLTextAreaElement>$event.target).textContent = '0 ';
    }
  }

  onKeyPress($event: KeyboardEvent) {
    let totalLength = (<HTMLTextAreaElement>$event.target).firstChild?.textContent?.length || 0;

    if (/[0-9]\.[0-9]|[0-9]+|\./gm.test($event.key) == false || totalLength >= 3) {
      $event.preventDefault();
    }
  }
}
