import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdsService } from './ads.service';

describe('AdsService', () => {
  let service: AdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    service = TestBed.inject(AdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call search method', () => {
    let spyService = spyOn(service, 'search');

    service.search({ limit: 1 });

    expect(spyService).toHaveBeenCalled();
  });

  it('should call getAdsProjectsData method', () => {
    let spyService = spyOn(service, 'getAdsProjectsData');

    service.getAdsProjectsData();

    expect(spyService).toHaveBeenCalled();
  });

  it('should call getAds method', () => {
    let spyService = spyOn(service, 'getAds');

    service.getAds(1, '1');

    expect(spyService).toHaveBeenCalled();
  });

  it('should call createAd method', () => {
    let spyService = spyOn(service, 'createAd');

    service.createAd({});

    expect(spyService).toHaveBeenCalled();
  });

  it('should call editAd method', () => {
    let spyService = spyOn(service, 'editAd');

    service.editAd({}, '1');

    expect(spyService).toHaveBeenCalled();
  });

  it('should call deleteById method', () => {
    let spyService = spyOn(service, 'deleteById');

    service.deleteById('1');

    expect(spyService).toHaveBeenCalled();
  });

  it('should call getById method', () => {
    let spyService = spyOn(service, 'getById');

    service.getById('1');

    expect(spyService).toHaveBeenCalled();
  });
});
