import { Component, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { RoleType, User } from '../../../Models/user/user.model';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() visible!: boolean;
  frmLogin!: FormGroup;
  userService = inject(UserService)
  globalService = inject(GlobalService)
  @Output() firstLetterChange: EventEmitter<string> = new EventEmitter<string>(false);

  title!: string
  source!: string;
  a!: ActivatedRouteSnapshot


  constructor(private router: Router) {
    this.frmLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    })
  }

  
  ngOnChanges() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.source = this.router.url;
        console.log(this.source);

      });
  }

  onDialogHide() {
    this.frmLogin.reset()
    this.globalService.setLoginView(false);
    this.source == '/cart' ? this.router.navigate(['/pay']) :this.source=='/register'?this.router.navigate(['/']): this.router.navigate([this.source])

  }
  login() {
    if (this.frmLogin.valid) {
      this.userService.Login(this.frmLogin.value).subscribe({
        next: (data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          this.firstLetterChange.emit(data.firstName.charAt(0).toUpperCase())
          this.globalService.setIsAdmin(data.role == RoleType.USER ? false : true)
          this.source == '/cart' ? this.router.navigate(['/pay']) :this.source=='/register'?this.router.navigate(['/']): this.router.navigate([this.source])
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
    this.visible = this.globalService.loginView();
  }
}
