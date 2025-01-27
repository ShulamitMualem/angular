import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  frmRegister!: FormGroup;
  userService=inject(UserService)
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
    sessionStorage.setItem("user", JSON.stringify(data.id));
  })
}
}
