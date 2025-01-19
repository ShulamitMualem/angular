import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

constructor() { }
cartQuantity=signal(0);
isAdmin:BehaviorSubject<boolean>=new BehaviorSubject(false)
getCartQuantity(){
  return this.cartQuantity()
}

setCartQuantity(quantity: number){
    this.cartQuantity.update(PrevcartQuantity => PrevcartQuantity+quantity);
  }
  getIsAdmin(){
    return this.isAdmin
  }
  
  setIsAdmin(chageRole: boolean){
      this.isAdmin.next(chageRole);
    }
}
