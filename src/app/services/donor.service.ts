import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donor } from '../Models/donor/donor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {
  constructor(private http: HttpClient) {} 
  private apiUrl = 'https://localhost:5001/api/Donors';
  donorsList: Donor[] = [];
 

  // getDonorIndex(currentdonor:string): number {
  //   return this.donorList.findIndex(donor => donor == currentdonor)

  // }
   getAll(): Observable<Donor[]> {
    return  this.http.get<Donor[]>(this.apiUrl);
      
  }
  getAllDonors(): any[] {
    return this.donorsList
  }
  getByIndex(index: number): Donor {
    return this.donorsList[index]
  }
  creatDonor(donor: Donor):Observable<Donor> {
    return  this.http.post<Donor>(this.apiUrl,donor)

  
  }
  deleteDonor(donoridToDelete:Donor) {
   console.log(donoridToDelete);
   return this.http.delete(`${this.apiUrl}\\${donoridToDelete.id}`)
  }
  UppdateDonor(donorToUpdate: Donor) {
    var x=`${this.apiUrl}/${donorToUpdate.id}`;
    return  this.http.put(`${this.apiUrl}/${donorToUpdate.id}`,donorToUpdate)
 

  }

}
