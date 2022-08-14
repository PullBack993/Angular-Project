import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkBuyPrice } from '../../user/util';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  allowEdit: boolean = false;
  err: boolean = false;

  propTransferTax: number = 3.5;
  propSale: number = 2;
  ownershipCoast: number = 1.1;
  mortgageEntry: number = 1.2;
  brokerFee: number = 3.6;
  totalPercentage: number = 11.4;

  totalTax: string = '116,778.75';
  monthlyPay: string = '1,319.91';
  totalWithTax: string = '316,778.75';

  totalWithTaxValue: string = '7,000';
  propSaleValue: string = '4,000';
  ownershipCoastValue: string = '2,200';
  mortgageEntryValue: string = '2,400';
  brokerFeeValue: string = '7,200';
  totalExtraCoasts: string = '22,800';

  total: string = '0';
  percentageCredit: string = '58.90';
  percentageExtraCoast: string = '6.71';
  percentagePaidInterest: string = '34.39';

  chartRate: number = 41.1;
  chartCoast: number = 6.71;

  buyPriceControl = new FormControl('200,000', [Validators.required]);

  formBuil: FormGroup = this.fb.group({
    buyPrice: this.buyPriceControl,
    creditDurationMonths: new FormControl(240, [Validators.required, Validators.maxLength(3)]),
    creditDurationYears: new FormControl(20, [Validators.required, Validators.maxLength(2)]),
    ratePercentage: new FormControl(5, [Validators.required, Validators.maxLength(2)]),
    ownPart: new FormControl('', [checkBuyPrice(this.buyPriceControl)])
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.total = this.toDecimalPoints(
      (
        parseFloat(this.totalWithTax.replace(/,/gm, '')) + parseFloat(this.totalExtraCoasts.replace(/,/gm, ''))
      ).toString()
    );
  }
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
    //TODO function for replacer ','
    let buyPrice = this.stringToFloat(this.buyPriceControl.value)
    if (fieldName == 'propTransferTax') {
      this.propTransferTax = currentNumber;
      this.totalWithTaxValue = this.toDecimalPoints(
        ((buyPrice * this.propTransferTax) / 100).toFixed(0)
      );
      return this.propTransferTax;
    } else if (fieldName == 'propSale') {
      this.propSale = Number(currentNumber);
      this.propSaleValue = this.toDecimalPoints(((buyPrice * this.propSale) / 100).toFixed(0));
      return this.propSale;
    } else if (fieldName == 'ownershipCoast') {
      this.ownershipCoast = currentNumber;
      this.ownershipCoastValue = this.toDecimalPoints(
        ((buyPrice * this.ownershipCoast) / 100).toFixed(0)
      );
      return this.ownershipCoast;
    } else if (fieldName == 'mortgageEntry') {
      this.mortgageEntry = currentNumber;
      this.mortgageEntryValue = this.toDecimalPoints(
        ((buyPrice * this.mortgageEntry) / 100).toFixed(0)
      );
      return this.mortgageEntry;
    } else if (fieldName == 'brokerFee') {
      this.brokerFee = currentNumber;
      this.brokerFeeValue = this.toDecimalPoints(((buyPrice * this.brokerFee) / 100).toFixed(0));
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
      this.totalPercentage =
        this.propTransferTax + this.propSale + this.ownershipCoast + this.mortgageEntry + this.brokerFee;
      this.totalExtraCoasts = this.toDecimalPoints(
        ((this.totalPercentage * this.buyPriceControl.value) / 100).toFixed(0)
      );
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
  toDecimal(e: Event) {
    console.log((e.target as HTMLInputElement).value)
    console.log('a')
    console.log((e.target as HTMLInputElement).value);
    console.log(this.buyPriceControl.value)

    // let b = this.toDecimalPoints(this.stringToFloat(this.buyPriceControl.value).toString());
    // console.log(b)
    // this.buyPriceControl.setValue(a);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    console.log('ttt')
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
    buyPrice = this.stringToFloat(buyPrice);
    let result = buyPrice * (rate + rate / ((1 + rate) ** creditDurationMonths - 1)) * creditDurationMonths;
    this.setFieldValue('propTransferTax', this.propTransferTax);
    this.setFieldValue('propSale', this.propSale);
    this.setFieldValue('ownershipCoast', this.ownershipCoast);
    this.setFieldValue('mortgageEntry', this.mortgageEntry);
    this.setFieldValue('brokerFee', this.brokerFee);

    this.totalPercentage =
      this.propTransferTax + this.propSale + this.ownershipCoast + this.mortgageEntry + this.brokerFee;
    this.totalExtraCoasts = this.toDecimalPoints(
      ((this.totalPercentage * this.stringToFloat(this.buyPriceControl.value)) / 100).toFixed(0)
    );

    this.totalTax = this.toDecimalPoints((result - buyPrice).toFixed(2));
    this.monthlyPay = this.toDecimalPoints((result / creditDurationMonths).toFixed(2));
    this.totalWithTax = this.toDecimalPoints(result.toFixed(2));

    this.total = this.toDecimalPoints(
      (this.stringToFloat(this.totalWithTax) + this.stringToFloat(this.totalExtraCoasts)).toFixed(2)
    );
    this.percentageExtraCoast = this.calcPercentage(
      this.stringToFloat(this.totalExtraCoasts),
      this.stringToFloat(this.total)
    );

    this.percentageCredit = this.calcPercentage(this.stringToFloat(this.buyPriceControl.value), this.stringToFloat(this.total));
    this.percentagePaidInterest = this.calcPercentage(
      this.stringToFloat(this.totalTax),
      this.stringToFloat(this.total)
    );

    this.chartRate = this.stringToFloat(this.percentageExtraCoast) + this.stringToFloat(this.percentagePaidInterest);
    this.chartCoast = this.stringToFloat(this.percentageExtraCoast);
  }
  stringToFloat(value: string) {
    return parseFloat(value.replace(/,/gm, ''));
  }

  toDecimalPoints(value: string) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  calcPercentage(currentValue: number, totalValue: number) {
    console.log(currentValue);
    console.log(totalValue);
    return ((currentValue / totalValue) * 100).toFixed(2);
  }
}
