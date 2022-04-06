import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdDto, IAds, IAdsCatalogDto, IAdsDto, ICreateAd } from '../models/ads';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  constructor(private http: HttpClient) {}

  getAdsProjectsData() {
    return this.http.get<IAdsDto>('https://real-estate-angular-project.herokuapp.com/api/home');
  }

  getAds(limit: number) {
    return this.http.get<IAdsCatalogDto>(`http://localhost:3000/api/catalog/${limit}`);
  }

  createAd(files: {}) {
    return this.http.post('http://localhost:3000/api/create', files);
  }

  getById(id: string) {
   return this.http.get<IAdDto>(`http://localhost:3000/api/details/${id}`).pipe(
      switchMap((res) => {
        return of(res.data);
      })
    );
  }
  
}
