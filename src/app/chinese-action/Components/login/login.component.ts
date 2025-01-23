import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { RoleType, User } from '../../../Models/user/user.model';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() visible!: boolean;
  @Output() visibleChange:EventEmitter<boolean>=new EventEmitter(false);
  frmLogin!: FormGroup;
  userService=inject(UserService) 
  globalService = inject(GlobalService)
title!:string
source!: string;
a!:ActivatedRouteSnapshot
  private sub!: Subscription;

  constructor(private router:Router,private activatedRoute: ActivatedRoute){
  this.frmLogin = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),

})}
ngOnChanges(){

  this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(() => {
    this.source = this.router.url; // או כל מידע אחר שתרצה להוציא מה-route
    console.log(this.source);
    
  });
}

onDialogHide() {
  this.frmLogin.reset()
  this.globalService.setLoginView(false);
  
  }
login() {
  if (this.frmLogin.valid) {
    this.userService.Login(this.frmLogin.value).subscribe({
      next: (data) => {
        sessionStorage.setItem("user", JSON.stringify(data));
       this.globalService.setIsAdmin(data.role==RoleType.USER?false:true)
      this.source=='/cart'?this.router.navigate(['/pay']):this.router.navigate([this.source])
      },
      error: (err) => {
        console.error("Login failed:", err);
        this.router.navigate(['register']);
      },
    });  
    this.globalService.setLoginView(false)
  } 
}
getvisible() {
  this.visible= this.globalService.loginView();
}
}
