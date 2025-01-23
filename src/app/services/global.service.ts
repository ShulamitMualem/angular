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
  // ngOnInit(){
  //   this.setCartQuantity(JSON.parse(sessionStorage.getItem("cart")||"[]").forEach((element:any) => {
  //     this.quantity+= element.quantity
  //     }))
  //     console.log(this.quantity);
      
  // }
ngOnChanges() {
    this.calculateSum();
  }

  private calculateSum(): void {
    const arrayString = sessionStorage.getItem('cart');
    if (arrayString) {
      const array = JSON.parse(arrayString);
      this.setCartQuantity(array.reduce((accumulator:number, currentValue:any) => accumulator + currentValue.quantity, 0));
    } else {
      this.setCartQuantity(0); // אם אין מערך, הסכום יהיה 0
    }
  }
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
