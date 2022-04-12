import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, switchMap } from 'rxjs';

import { IAdDto, IAdsCatalogDto, IAdsDto, ISearch } from '../models/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private _searchData = new BehaviorSubject<any>(undefined);

  currentSearchData$ = this._searchData.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  search(searchParams: ISearch) {
    this.http.post('http://localhost:3000/api/home/search', searchParams).subscribe({
      next: (data) => {
        this._searchData.next(data);
        this.router.navigate(['/search']);
      }
    });
  }

  getAdsProjectsData() {
    return this.http.get<IAdsDto>('https://real-estate-angular-project.herokuapp.com/api/home');
  }

  getAds(limit: number, path: string) {
    return this.http.get<IAdsCatalogDto>(`http://localhost:3000/api/catalog/${path}/${limit}`);
  }

  createAd(files: {}) {
    return this.http.post('http://localhost:3000/api/create', files);
  }

  editAd(files: {}, id: string) {
    return this.http.put(`http://localhost:3000/api/edit/${id}`, files).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('sucess');
        this.router.navigate(['']);
      },
      error: (err) => {
        this.router.navigate(['/login']);
        console.log(err);
        console.log(err.error.message);
      }
    });
  }

  getById(id: string) {
    return this.http.get<IAdDto>(`http://localhost:3000/api/details/${id}`).pipe(
      switchMap((res) => {
        return of(res.data);
      })
    );
  }
}
