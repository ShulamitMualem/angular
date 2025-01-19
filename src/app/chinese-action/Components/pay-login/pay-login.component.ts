import { Component } from '@angular/core';

@Component({
  selector: 'app-pay-login',
  templateUrl: './pay-login.component.html',
  styleUrl: './pay-login.component.css'
})
export class PayLoginComponent {
  amount:number=0
  ngOnInit(){
    this.paymentCalculation();
  }
  paymentCalculation(){
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]")
    cart.map((item:any)=>this.amount+=item.gift.price*item.quantity)
  } 
}
