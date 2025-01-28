import { Component, inject, signal } from '@angular/core';
import { GiftsService } from '../../../services/gifts.service';
import { Gift } from '../../../Models/gift.model';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { SelectButton } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { RaffleComponent } from '../raffle/raffle.component';
import { RaffleService } from '../../../services/raffle.service';
import { switchAll } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-gifts',
  templateUrl: './view-gifts.component.html',
  styleUrl: './view-gifts.component.css',

})
export class ViewGiftsComponent {
  layout: string = 'list';
  option: any = 'grid'
  gifts!: Gift[];
  cart: any
  globalSrv = inject(GlobalService)
  raffleService=inject(RaffleService)
  constructor(private giftService: GiftsService, private router: Router) {

  }
  UpdatePermition(){
    this.raffleService.getDateOfRaffle().subscribe(date=>{
      this.globalSrv.setIsRaffleAlowed(formatDate(date,"YYYY-MM-DD hh:mm:ss",'en_US')<formatDate(new Date(), "YYYY-MM-DD hh:mm:ss",'en_US')||this.globalSrv.getIsRaffle()?false:true)
      console.log(this.globalSrv.getIsRaffleAlowed());
      
})}
  ngOnInit() {
    this.giftService.getAll().subscribe(data => {
      this.gifts = data
      console.log(data);
      this.UpdatePermition()

    })
  }
  addToCart(gift: Gift) {
    this.cart = JSON.parse(sessionStorage.getItem("cart") || "[]")
    const currentItem = this.cart.find((item: any) => item.gift.id === gift.id)
    currentItem ? currentItem.quantity += 1 : this.cart.push({ "gift": gift, "quantity": 1 })
    sessionStorage.setItem("cart", JSON.stringify(this.cart))
    this.globalSrv.setCartQuantity(1);
    console.log(this.cart);
    Swal.fire({
      icon: "success",
      title: "gift added to  cart",
      showConfirmButton: false,
      timer: 1000
    });
    
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }
}
