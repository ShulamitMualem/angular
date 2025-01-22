import { Component, OnInit, ViewChild } from '@angular/core';
import { Gift } from '../../../Models/gift.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftsService } from '../../../services/gifts.service';
import { Observable } from 'rxjs';
import { DonorsService } from '../../../services/donor.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-list-of-gifts',
  templateUrl: './list-of-gifts.component.html',
  styleUrl: './list-of-gifts.component.css',
  styles: [
    `:host ::ng-deep .p-dialog .gift-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`,
  ],
})
export class ListOfGiftsComponent implements OnInit {
 @ViewChild('dt') dt!: Table;
  
  giftDialog: boolean = false;

  gifts!: Gift[];

  gift!: Gift;

  selectedGifts!: Gift[] | null;

  submitted: boolean = false;

  donors!: any[];
  isUniqueName:boolean=true;

  constructor(
     private router: Router, 
    private giftService: GiftsService,
    private donorService: DonorsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
   
  ) {}
getData()  {
   this.giftService.getAll().subscribe(data=>this.gifts=data)
}
  ngOnInit() {
    this.getData()
   this.donorService.getAll().subscribe(data=>this.donors=data);
  }
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;
    debugger
    this.dt.filterGlobal(searchValue, 'contains');
  }
  openNew() {
    this.gift = {
      id: 0,
     name: '',
      description: '',
      donorId: this.donors[0].id,
      imgUrl: '',
      price:10,
    };
    this.submitted = false;
    this.giftDialog = true;
  }

  deleteSelectedGifts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected gifts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedGifts){
        this.selectedGifts.forEach(gift => {
          this.giftService.deleteGift(gift).subscribe(data=>{ this.selectedGifts = null;
            this.getData()
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'gifts Deleted',
              life: 3000,
            })})}
         )} },
    });
  }
  editgift(gift: Gift) {
    this.gift = { ...gift };
    this.giftDialog = true;
  }

 deleteGift(gift: Gift) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + gift.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async ()  => {
       this.giftService.deleteGift(gift).subscribe(data=>{
          this.getData()
        })
       
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'gift Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.giftDialog = false;
    this.submitted = false;
  }
  selectedImage: string | ArrayBuffer | null = null;

  imagePath: string = '';
  
  
  onFileSelected(event: Event) {
  
  const input = event.target as HTMLInputElement;
  
  if (input.files && input.files.length > 0) {
  
  const file = input.files[0];
  
  const reader = new FileReader();
  
  
  reader.onload = (e: any) => {
  
  this.selectedImage = e.target.result; // הנתיב לתמונה בכרטיסיית תמונה
  
this.gift.imgUrl =e.target.result; // כאן אתה יכול לשמור את שם הקובץ במודל שלך
  
  };
  
  
  reader.readAsDataURL(file); // קורא את הקובץ כ-data URL
  
  }
  
  }
  
  
  
  
  savegift() {
    this.submitted = true;
    if (this.gift.name?.trim() && this.gift.price && this.gift.price >= 10
     && this.gift.description?.trim() && this.isUniqueName==true) {
      if (this.gift.id) {
       this.giftService.UppdateGift(this.gift).subscribe(data=>{this.getData()
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'gift Updated',
          life: 3000,
        });})
      } else {
        this.giftService.creatGift(this.gift).subscribe(data=>{this.getData()
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'gift Created',
            life: 3000,
          });});

      }}else{
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'cant save with validation errors',
          life: 3000,
        });
    }

      this.gifts = [...this.gifts];
      this.giftDialog = false;
      this.gift = {
        id: 0,
        name: '',
        description: '',
        donorId: this.donors[0].id,
        imgUrl: '',
        price:10,
      };
      this.isUniqueName=true
    
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.gifts.length; i++) {
      if (this.gifts[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return 'danger'
  }
  todonors()
{
  this.router.navigate(['/donors', { id: 123 }]);
}
checkUniqueName(){
this.giftService.isUniqueName(this.gift).subscribe(data=>{
this.isUniqueName=data;
console.log(data);

})
}
}
