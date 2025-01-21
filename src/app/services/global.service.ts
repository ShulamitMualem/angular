import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  cartQuantity = signal(0);
  loginView = signal(false);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false)
  getCartQuantity() {
    return this.cartQuantity()
  }
  setCartQuantity(quantity: number) {
    this.cartQuantity.update(PrevcartQuantity => PrevcartQuantity + quantity);
  }
  getLoginView() {
    return this.loginView()
  }

  setLoginView(view: boolean) {
    debugger
    this.loginView.set(view);
    console.log("this.getLoginView()");
    console.log(this.getLoginView());
  }
  getIsAdmin() {
    return this.isAdmin
  }

  setIsAdmin(chageRole: boolean) {
    this.isAdmin.next(chageRole);
  }
}
