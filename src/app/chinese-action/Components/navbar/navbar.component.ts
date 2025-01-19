
import { Component, OnInit, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  items: MenuItem[] | undefined;
  authService=inject(AuthService)
  globalSrv=inject(GlobalService)

  constructor(   private router: Router) {
      
  }
  ngOnInit() {
 this.setItems()
  }
  setItems(){
    this.globalSrv.getIsAdmin().subscribe(data=>{this.items = [
      {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '',

      },
      {
        label: 'Login',
    routerLink: '/login',
    icon: 'pi pi-sign-in'
      },

      {
          label: 'Shop Gifts',
          icon: 'pi pi-gift',
          routerLink: 'viewGift',
      },

  ];
  this.authService.hasRole([1])?this.items.push({
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

        },        {
          label: 'Raffle',
          icon: 'pi pi-tags',
          routerLink: '/admin/raffle',

      }
  
    ]
}):"" })
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '',

      },
      {
        label: 'Login',
    routerLink: '/login',
    icon: 'pi pi-sign-in'
      },

      {
          label: 'Shop Gifts',
          icon: 'pi pi-gift',
          routerLink: 'viewGift',
      },

  ];
  this.authService.hasRole([1])?this.items.push({
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

        },        {
          label: 'Raffle',
          icon: 'pi pi-tags',
          routerLink: '/admin/raffle',

      }
  
    ]
}):"" 
  }
  navgateToCart(){
    this.router.navigate(['/cart']);
}
}
