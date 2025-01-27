import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products: any[] = [];
  globalSrv = inject(GlobalService);
  isCartVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.products = this.getCartFromSession();
    this.globalSrv.cartVisible$.subscribe(visible => {
      this.isCartVisible = visible;
      if (visible) {
        this.products = this.getCartFromSession();
      }
      console.log(this.isCartVisible);
      debugger;
    });
  }

  payment() {
    const user = JSON.parse(sessionStorage.getItem('user') || 'null');
    user ? this.router.navigate(['/pay']) : this.globalSrv.setLoginView(true);
    this.onDialogHide()
  }

  getCartFromSession(): any {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  deleteFromCart(itemToDelete: any) {
    this.globalSrv.setCartQuantity(-itemToDelete.quantity);
    let cart = this.getCartFromSession();
    cart = cart.filter((item: any) => item.gift.id != itemToDelete.gift.id);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    this.products = this.getCartFromSession();
  }

  addQuantity(product: any) {
    this.products = this.getCartFromSession();
    this.products.map((item: any) =>
      item.gift.id == product.gift.id ? item.quantity++ : ''
    );
    sessionStorage.setItem('cart', JSON.stringify(this.products));
    this.globalSrv.setCartQuantity(1);
  }

  subQuantity(product: any) {
    this.products = this.getCartFromSession();
    this.products.map((item: any) =>
      item.gift.id == product.gift.id
        ? item.quantity > 1
          ? item.quantity--
          : this.deleteFromCart(item)
        : ''
    );
    sessionStorage.setItem('cart', JSON.stringify(this.products));
    this.globalSrv.setCartQuantity(-1);
  }

  onDialogHide() {
    this.globalSrv.toggleCartVisibility(false);
  }
}
