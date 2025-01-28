import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  frmRegister!: FormGroup;
  userService=inject(UserService)
  globalService=inject(GlobalService)
  route=inject(Router)
  constructor(){
  this.frmRegister = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)])
})

}
createUser(){
  this.userService.creatUser(this.frmRegister.value).subscribe(data=>{

Swal.fire({
  title: "register succsesfuly",
  icon: "success",
  draggable: true
}).then(() => {
  this.globalService.setLoginView(true)
});
  })
}
moveToLogin(){
  this.globalService.setLoginView(true)
}
}
