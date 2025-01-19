import { inject, Injectable } from '@angular/core';
import { Gift } from '../Models/gift.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GiftsService {
  private apiUrl = 'https://localhost:5001/api/Gifts';
  giftsList: Gift[] = []
  http: HttpClient = inject(HttpClient)
  getGiftIndex(currentGift: Gift):number {
    return this.giftsList.findIndex(gift => gift.id == currentGift.id)
   }

  getAll(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.apiUrl);
  }
  getByIndex(index: number): Gift {
    return this.giftsList[index]
  }
  creatGift(gift: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.apiUrl, gift)
  }
  deleteGift(giftIdToDelete: Gift):Observable<Object>  {
    return this.http.delete(`${this.apiUrl}/${giftIdToDelete.id}`)
  }
  UppdateGift(giftToUpdate: Gift):Observable<Object> {
    return this.http.put(`${this.apiUrl}/${giftToUpdate.id}`, giftToUpdate)
  }
  isUniqueName(gift:Gift):Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/isUnique`, gift)
  }
}


