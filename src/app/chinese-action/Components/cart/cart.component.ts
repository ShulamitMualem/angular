import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products!:[];
  constructor( private router: Router, ) {}

  ngOnInit() {
      this.products = JSON.parse(sessionStorage.getItem("cart") || "[]")
      console.log(this.products);
      
  }
  payment(){
    this.router.navigate(['/payLogin', { id: 123 }]);
  }
}
