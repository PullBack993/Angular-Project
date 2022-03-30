import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  @Input() controlName!: string;
  @Input() sourceGroup!: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  // checkTouch(controlName: string, sourceGroup: FormGroup) {
  //   return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  // }
}
