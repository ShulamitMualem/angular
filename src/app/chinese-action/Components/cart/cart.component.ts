import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products!: [];
  globalSrv=inject(GlobalService)
  constructor(private router: Router,) { }

  ngOnInit() {
    this.products = JSON.parse(sessionStorage.getItem("cart") || "[]")
    console.log(this.products);

  }
  payment() {
    this.router.navigate(['/payLogin']);
  }
  getCartFromSession(): any {
    return JSON.parse(sessionStorage.getItem("cart") || "[]")
  }
  deleteFromCart(itemToDelete: any) {
    this.globalSrv.setCartQuantity(-itemToDelete.quantity)
   let cart = this.getCartFromSession()
   debugger
  cart =cart.filter((item: any) => { item.gift.id !=itemToDelete.gift.id})
    sessionStorage.setItem("cart",JSON.stringify(cart))
    this.products = this.getCartFromSession()
  }
  addQuantity(product: any) {
    this.products = this.getCartFromSession()
    this.products.map((item: any) => item.gift.id == product.gift.id ? item.quantity++ : '')
    sessionStorage.setItem("cart",JSON.stringify(this.products))
    this.globalSrv.setCartQuantity(1)
  }
  subQuantity(product: any) {
    this.products = this.getCartFromSession()
    this.products.map((item: any) => { item.gift.id == product.gift.id ? item.quantity > 1 ? item.quantity-- : this.deleteFromCart(item) : '' })
    sessionStorage.setItem("cart",JSON.stringify(this.products))
    this.globalSrv.setCartQuantity(-1)
  }
}
