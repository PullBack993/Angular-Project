import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { IAdDto, IAdsCatalogDto, IAdsDto, ISearch } from '../models/ads';
import { environment } from 'src/environments/environment';
import { MessageService, MessageType } from './message.service';

const BACKEND_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
  
export class AdsService {
  private _searchData = new BehaviorSubject<any>(undefined);

  currentSearchData$ = this._searchData.asObservable();

  constructor(private http: HttpClient,private messageService:MessageService, private router: Router) {}

  search(searchParams: ISearch) {
    this.http.post(BACKEND_URL +'/home/search', searchParams).subscribe({
      next: (data) => {
        this._searchData.next(data);
        this.router.navigate(['/search']);
      }
    });
  }

  getAdsProjectsData() {
    return this.http.get<IAdsDto>(BACKEND_URL + '/home');
  }

  getAds(limit: number, path: string) {
    return this.http.get<IAdsCatalogDto>(BACKEND_URL + `/catalog/${path}/${limit}`);
  }

  createAd(files: {}) {
    return this.http.post(BACKEND_URL + '/create', files);
  }

  editAd(files: {}, id: string) {
    return this.http.put(BACKEND_URL + `/edit/${id}`, files).subscribe({
      next: () => {
         this.messageService.notifyForMessage({ text: `Anzeige erfolgreich bearbeitet!`, type: MessageType.success });
        this.router.navigate(['/properties']);
      },
      error: () => {
        this.router.navigate(['']);
      }
    });
  }  

  deleteById(id: string) {
    this.http.delete(BACKEND_URL + `/delete/${id}`).subscribe({
      next: () => {
        this.router.navigate(['/properties']);
         this.messageService.notifyForMessage({ text: `Anzeige erfolgreich gelöscht!`, type: MessageType.success });
      }
    });
  }
  getById(id: string) {
    return this.http.get<IAdDto>(BACKEND_URL + `/details/${id}`).pipe(
      switchMap((res) => {
        return of(res.data);
      })
    );
  }
}
