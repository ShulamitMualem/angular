import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Donor } from '../../../Models/donor/donor';
import { DonorsService } from '../../../services/donor.service';
import { emailUniqe } from '../../../Validators/emailUniqe';
import { __values } from 'tslib';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrl: './donor-form.component.css'
})
export class DonorFormComponent implements OnInit {
  frmDonor:FormGroup=new FormGroup({});
  donorService:DonorsService=inject(DonorsService)
  @Input() donor!: Donor;
  @Input() visible!: boolean;
  @Output() visibleChange:EventEmitter<boolean>=new EventEmitter(false);
  @Output() refreshData:EventEmitter<boolean>=new EventEmitter(false);
  submitted: boolean = false;
  emailReg: RegExp = new RegExp('[]@[a-z].[a-z]')
  constructor(private activatedRoute: ActivatedRoute,
   private donorSrv: DonorsService ,
   private messageService: MessageService,
) {
    this.frmDonor = new FormGroup({
      firstName: new FormControl('', [emailUniqe()]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required ,Validators.email])
    });
  }
  ngOnInit() {
console.log(this.donor);
console.log("dfghjkl");
  }
  

ngOnChanges(){
  this.frmDonor.controls['firstName'].setValue(this.donor?this.donor.firstName:'')
  this.frmDonor.controls['lastName'].setValue(this.donor?this.donor.lastName:'')
  this.frmDonor.controls['email'].setValue(this.donor?this.donor.email:'')
  }
  save(){
    this.donorService.creatDonor(this.frmDonor.value).subscribe(data=> this.visibleChange.emit(false))
   
  }
  hideDialog() {
    debugger
    this.visibleChange.emit(false) ;
    this.submitted = false;
  }
 savedonor() {
  this.donor.firstName=this.frmDonor.controls['firstName'].value
  this.donor.lastName=this.frmDonor.controls['lastName'].value
  this.donor.email=this.frmDonor.controls['email'].value
  debugger
    this.submitted = true;
    if (this.donor.firstName?.trim()) {
      if (this.donor.id) {
      this.donorService.UppdateDonor(this.donor).subscribe(data=>{ 
       this.refreshData.emit(true);
        this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'donor Updated',
        life: 3000,
      });})

      } else {
         this.donorService.creatDonor(this.donor).subscribe(data=>{
          this.refreshData.emit(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'donor Created',
            life: 3000,
          });
         });
        
      }
      this.visibleChange.emit(false)
      this.visible = false;
      // this.donor = {
      //   id: 0,
      //   firstName: '',
      //   lastName:'',
      //   email:'',
      // };
    } 
     this.visibleChange.emit(false)
  }

}
