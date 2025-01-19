import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { RoleType, User } from '../../../Models/user/user.model';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  frmLogin!: FormGroup;
  userService=inject(UserService) 
  globalService = inject(GlobalService)
  constructor(private router:Router){
  this.frmLogin = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),

})}
login() {
  if (this.frmLogin.valid) {
    this.userService.Login(this.frmLogin.value).subscribe({
      next: (data) => {
        console.log(data);
        sessionStorage.setItem("user", JSON.stringify(data));
       this.globalService.setIsAdmin(true)
      },
      error: (err) => {
        console.error("Login failed:", err);
        this.router.navigate(['register']);
      },
    });
  } 
  this.router.navigate(['pay'])
}

}
