import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ListOfGiftsComponent } from './Components/list-of-gifts/list-of-gifts.component';
import { RouterModule } from '@angular/router';
import { ImportsModule } from './imports';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftsService } from '../services/gifts.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { DonorFormComponent } from './Components/donor-form/donor-form.component';
import { DonorsService } from '../services/donor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ViewGiftsComponent } from './Components/view-gifts/view-gifts.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { BuyGiftsComponent } from './Components/buy-gifts/buy-gifts.component';
import { ListOfDonorsComponent } from './Components/list-of-donors/list-of-donors.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderListModule } from 'primeng/orderlist';
import { PayLoginComponent } from './Components/pay-login/pay-login.component';
import { PayComponent } from './Components/pay/pay.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { RaffleComponent } from './Components/raffle/raffle.component';
import { RoleType } from '../Models/user/user.model';
import { roleGuard } from './Guard/role.guard';
import { ListboxModule } from 'primeng/listbox';
import { CountdownPipe } from './Pipe/countdown-pipe.pipe';





@NgModule({
  declarations: [
    ListOfGiftsComponent,
    DonorFormComponent,
    ListOfDonorsComponent,
    DonorFormComponent,
   ViewGiftsComponent,
    RegisterComponent,
    LoginComponent,
    BuyGiftsComponent,
    CartComponent,
    PayLoginComponent,
    PayComponent,
    NavbarComponent,
    HomeComponent,
    RaffleComponent,
    CountdownPipe
    ],
  imports: [ 
    ListboxModule,
    OrderListModule, 
    DataViewModule, ButtonModule, TagModule,
    CommonModule,
    ImportsModule,
    NoopAnimationsModule,
    FormsModule,
ReactiveFormsModule,
    RouterModule.forChild([
    
      {path: 'viewGift', component: ViewGiftsComponent },
      {path: 'viewGifts', component:BuyGiftsComponent },
      {path: 'register', component: RegisterComponent },
      {path: 'cart', component: CartComponent},
      {path: 'payLogin', component: PayLoginComponent},
      {path: 'pay', component: PayComponent },
      {path:'', component:HomeComponent},
      {path: 'admin' ,canActivate: [roleGuard],
        data: { roles: [RoleType.ADMIN] },children:[
      {path: '', redirectTo:'gifts', pathMatch: 'full'},
      {path: 'gifts', component: ListOfGiftsComponent  },
      {path: 'donors', component: ListOfDonorsComponent},
      {path: 'raffle', component: RaffleComponent },
      ]},
    ])

  ],
  providers: [MessageService, ConfirmationService, GiftsService,DonorsService],
  exports:[NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChineseActionModule { }
