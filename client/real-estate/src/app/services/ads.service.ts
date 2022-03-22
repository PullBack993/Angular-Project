import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient) { }

  getAdsProjectsData() {
    return this.http.get('https://real-estate-angular-project.herokuapp.com/api/home');
  }
}
