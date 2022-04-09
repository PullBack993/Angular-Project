import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdDto, IAdsCatalogDto, IAdsDto } from '../models/ads';
import { of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  constructor(private http: HttpClient, private route: Router) {}

  getAdsProjectsData() {
    return this.http.get<IAdsDto>('https://real-estate-angular-project.herokuapp.com/api/home');
  }

  getAds(limit: number) {
    return this.http.get<IAdsCatalogDto>(`http://localhost:3000/api/catalog/${limit}`);
  }

  createAd(files: {}) {
    return this.http.post('http://localhost:3000/api/create', files);
  }

  editAd(files: any, id: string) {
    return this.http.put(`http://localhost:3000/api/edit/${id}`, files).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('sucess');
        this.route.navigate(['']);
      },
      error: (err) => {
        this.route.navigate(['/login']);
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
