
import { Component, Input, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  authService = inject(AuthService)
  globalSrv = inject(GlobalService)
  visible: boolean = false;
  backGroundColor:string='#dee9fc'
  firstLetter:string="A"

  firstLetterChange(first:string){
    this.firstLetter=first
  }
  constructor(private router: Router) {

  }
  openCart() {
    this.globalSrv.toggleCartVisibility(true);
  }
  setVisibleLogin(){
    this.globalSrv.setLoginView(true)
  }
  ngOnInit() {
    this.setItems()
    this.calculateQuantityOfCart()
  }
  private calculateQuantityOfCart(): void {
    const arrayString = sessionStorage.getItem('cart');
    if (arrayString) {
      const array = JSON.parse(arrayString);
      this.globalSrv.setCartQuantity(array.reduce((accumulator:number, currentValue:any) => accumulator + currentValue.quantity, 0));
    } else {
      this.globalSrv.setCartQuantity(0); 
    }
  }
  setItems() {
    this.globalSrv.getIsAdmin().subscribe(data => {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '',

        },
        {
          label: 'Login',
          icon: 'pi pi-sign-in'
        },

        {
          label: 'Shop Gifts',
          icon: 'pi pi-gift',
          routerLink: 'viewGift',
        },

      ];
      this.authService.hasRole([1]) ? this.items.push({
        label: 'Manager',
        icon: 'pi pi-user-edit',
        items: [
          {
            label: 'Gifts',
            icon: 'pi pi-gift',
            routerLink: '/admin/gifts'

          },
          {
            label: 'Donors',
            icon: 'pi pi-users',
            routerLink: '/admin/donors',


          },
          {
            label: 'Users',
            icon: 'pi pi-user'

          }, {
            label: 'Raffle',
            icon: 'pi pi-tags',
            routerLink: '/admin/raffle',

          }

        ]
      }) : ""
    })
    
  }

  navgateToCart() {
    this.router.navigate(['/cart']);
  }
}
