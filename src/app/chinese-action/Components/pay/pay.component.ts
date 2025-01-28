import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RaffleService } from '../../../services/raffle.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  paymentForm: FormGroup;
  raffleService:RaffleService=inject(RaffleService)
  router=inject(Router)
  globalservice=inject(GlobalService)
  constructor() {
    this.paymentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-?\d{4}-?\d{4}-?\d{4}$/)]),  
      idNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
      expiryDate:new FormControl( '', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)])
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
    this.raffleService.creatLotteryTickets(JSON.parse(sessionStorage.getItem("user")||"-1"),JSON.parse(sessionStorage.getItem("cart")||"[]")).subscribe((data)=>{
        Swal.fire({
          icon: "success",
          title: "Your orderd had been recived thankyou for your donatiation ",
          showConfirmButton: false,
          timer: 3000
        });
        sessionStorage.removeItem("cart")
        this.globalservice.resetCartQuantity()
        this.router.navigate(['/'])
        }) 

    } 
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "'Please fix the errors before submitting.",
  
      });
    }
  }
raffle(){
  this.raffleService.getRaffleResponseList().subscribe((data)=>{
  console.log(data);

  }) 
}
formatCardNumber(event: any): void {
  let input = event.target.value.replace(/\D/g, ''); // הסרת תווים לא מספריים
  if (input.length > 16) {
    input = input.slice(0, 16); // הגבלת אורך ל-16 ספרות
  }
  const formatted = input.replace(/(\d{4})(?=\d)/g, '$1-'); // הוספת מקפים אחרי כל 4 ספרות
  event.target.value = formatted;
}

formatIDNumber(event: any): void {
  let input = event.target.value.replace(/\D/g, ''); // הסרת תווים לא מספריים
  if (input.length > 9) {
    input = input.slice(0, 9); // הגבלת אורך ל-9 ספרות
  }
  event.target.value = input; // מציג את המספר עם עד 9 ספרות
}
}