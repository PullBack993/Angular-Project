import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdsCatalogDto, IAdsDto, ICreateAd } from '../models/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  constructor(private http: HttpClient) {}

  getAdsProjectsData() {
    return this.http.get<IAdsDto>('https://real-estate-angular-project.herokuapp.com/api/home');
  }

  getAds(limit: number) {
    return this.http.get<IAdsCatalogDto>(`https://real-estate-angular-project.herokuapp.com/api/catalog/${limit}`);
  }

  createAd(files: {}) {
    return this.http.post('http://localhost:3000/api/create', files);
  }
}
