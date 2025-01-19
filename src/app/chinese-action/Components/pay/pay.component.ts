import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RaffleService } from '../../../services/raffle.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  paymentForm: FormGroup;
  raffleService:RaffleService=inject(RaffleService)
  constructor() {
    this.paymentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cardNumber:new FormControl( '', [Validators.required, Validators.pattern(/^\d{16}$/)]),
      expiryDate:new FormControl( '', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)])
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Payment Details:', this?.paymentForm.value);
      alert('Payment Successful!');
      this.raffleService.creatLotteryTickets(JSON.parse(sessionStorage.getItem("user")||"-1").id,JSON.parse(sessionStorage.getItem("cart")||"[]")).subscribe((data)=>{
        console.log(data);
        }) 
    } else {
      alert('Please fix the errors before submitting.');
    }
  }
raffle(){
  this.raffleService.getRaffleResponseList().subscribe((data)=>{
  console.log(data);

  }) 
}
}
