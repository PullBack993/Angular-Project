import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { CreateAdComponent } from './create-ad.component';
import { AdsService } from '../../services/ads.service';

describe('Test form controller', () => {
  let component: CreateAdComponent;
  let messageService: MessageService;
  let createService: AdsService;
  let router: Router;

  beforeEach(() => {
    component = new CreateAdComponent(new FormBuilder(), messageService, createService, router);
  });

  it('should test form controller(validity)', () => {
    expect(component.addFormGroup.valid).toBeFalsy();
  });

  describe('Form controller unhappy cases(invalid)', () => {
    it('should make adType control required', () => {
      checkValidity('adType');
    });

    it('should make image control required', () => {
      checkValidity('image');
    });

    it('should make title control required', () => {
      checkValidity('title');
    });

    it('should make title control required(more then 58)', () => {
      let moreThenMaxLength = '59aaaaaaaaaassssssssssddddddddddffffffffffgggggggggghhhhhhh';
      checkValidity('title', moreThenMaxLength);
    });

    it('should make estateType control required', () => {
      checkValidity('estateType');
    });

    it('should make price control required', () => {
      checkValidity('price');
    });

    it('should make location control required', () => {
      checkValidity('location');
    });

    it('should make region control required', () => {
      checkValidity('region');
    });

    it('should make area control required', () => {
      checkValidity('area');
    });

    it('should make constructionType control required', () => {
      checkValidity('constructionType');
    });

    it('should make tags control required', () => {
      checkValidity('tags');
    });

    it('should make telNumber control required', () => {
      checkValidity('telNumber');
    });

    it('should make moreInfo control required', () => {
      checkValidity('moreInfo');
    });

    function checkValidity(controlName: string, value: string = '') {
      let control = component.addFormGroup.get(controlName);

      control?.setValue(value || '');

      expect(control?.valid).toBeFalsy();
    }
  });

  describe('Form controller happy cases(valid)', () => {
    it('should make adType control required', () => {
      checkValidity('adType', 'value');
    });

    it('should make image control required', () => {
      checkValidity('image', 'value');
    });

    it('should make estateType control required', () => {
      checkValidity('estateType', 'panel');
    });

    it('should make price control required', () => {
      checkValidity('price', '12 000');
    });

    it('should make location control required', () => {
      checkValidity('location', 'VR');
    });

    it('should make region control required', () => {
      checkValidity('region', 'VR');
    });

    it('should make area control required', () => {
      checkValidity('area', '123');
    });

    it('should make constructionType control required', () => {
      checkValidity('constructionType', 'aDs');
    });

    it('should make tags control required', () => {
      checkValidity('tags', '1');
    });

    it('should make telNumber control required', () => {
      checkValidity('telNumber', '444');
    });

    it('should make moreInfo control required', () => {
      checkValidity('moreInfo', 'a');
    });

    function checkValidity(controlName: string, value: string = '') {
      let control = component.addFormGroup.get(controlName);

      control?.setValue(value || 'value=none');

      expect(control?.valid).toBeTrue();
    }
  });
});
