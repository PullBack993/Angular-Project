import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdsCatalogDto, IAdsDto } from '../models/ads';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient) { }

  getAdsProjectsData() {
    return this.http.get<IAdsDto>('https://real-estate-angular-project.herokuapp.com/api/home');
  }

  getAds(limit: number){
    return this.http.get<IAdsCatalogDto>(`https://real-estate-angular-project.herokuapp.com/api/catalog/${limit}`)
  }
}


