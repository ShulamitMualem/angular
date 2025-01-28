import { Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  quantity:number=0
  cartQuantity = signal(this.quantity);
  loginView = signal(false);
  a:string[]=[]
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false)
  cartVisibleSubject = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisibleSubject.asObservable();
  IsRaffleAlowed=signal(true)
  IsRaffle=signal(false)

  toggleCartVisibility(isVisible: boolean) {
    this.cartVisibleSubject.next(isVisible); 
  }


ngOnChanges() {
    this.calculateSum();
  }

  private calculateSum(): void {
    debugger
    const arrayString = sessionStorage.getItem('cart');
    if (arrayString) {
      const array = JSON.parse(arrayString);
      this.setCartQuantity(array.reduce((accumulator:number, currentValue:any) => accumulator + currentValue.quantity, 0));
    } else {
      this.setCartQuantity(0); 
    }
  }
  getCartQuantity() {
    return this.cartQuantity()
  }
  setCartQuantity(quantity: number) {
    this.cartQuantity.update(PrevcartQuantity => PrevcartQuantity + quantity);
  }
  resetCartQuantity() {
    sessionStorage.removeItem("cart")
    this.cartQuantity.update(PrevcartQuantity => PrevcartQuantity - PrevcartQuantity);
  }
  getLoginView() {
    return this.loginView()
  }
  getIsRaffle(){
    return this.IsRaffle()
  }
  setIsRaffle(bool:boolean){
this.IsRaffle.set(bool)
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
  getIsRaffleAlowed(){
    return this.IsRaffleAlowed()
  }
  
  setIsRaffleAlowed(view: boolean){
      this.IsRaffleAlowed.set(view);
    }
}
