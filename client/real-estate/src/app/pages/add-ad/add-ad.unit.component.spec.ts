import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AddAdComponent } from './add-ad.component';
import { AdsService } from '../../services/ads.service';

describe('Test form controller', () => {
  let component: AddAdComponent;
  let messageService: MessageService;
  let createService: AdsService;
  let router: Router;

  beforeEach(() => {
    component = new AddAdComponent(new FormBuilder(), messageService, createService, router);
  });

  it('should test form controller(validity)', () => {
    expect(component.addFormGroup.valid).toBeFalsy();
  });

  describe('Form controller unhappy case(invalid)', () => {
    it('should make adType control required', () => {
      let control = component.addFormGroup.get('adType');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });

    it('should make image control required', () => {
      let control = component.addFormGroup.get('image');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });

    it('should make title control required', () => {
      let control = component.addFormGroup.get('title');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });

    it('should make estateType control required', () => {
      let control = component.addFormGroup.get('estateType');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });

    it('should make price control required', () => {
      let control = component.addFormGroup.get('price');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });

    it('should make location control required', () => {
      let control = component.addFormGroup.get('location');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });
      
    it('should make region control required', () => {
      let control = component.addFormGroup.get('region');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });

    it('should make area control required', () => {
      let control = component.addFormGroup.get('area');

      control?.setValue('');

      expect(control?.valid).toBeFalsy();
    });

     it('should make constructionType control required', () => {
       let control = component.addFormGroup.get('constructionType');

       control?.setValue('');

       expect(control?.valid).toBeFalsy();
     });
      
     it('should make tags control required', () => {
       let control = component.addFormGroup.get('tags');

       control?.setValue('');

       expect(control?.valid).toBeFalsy();
     });

       it('should make telNumber control required', () => {
         let control = component.addFormGroup.get('telNumber');

         control?.setValue('');

         expect(control?.valid).toBeFalsy();
       });
      
        it('should make moreInfo control required', () => {
          let control = component.addFormGroup.get('moreInfo');

          control?.setValue('');

          expect(control?.valid).toBeFalsy();
        });
  });
});
