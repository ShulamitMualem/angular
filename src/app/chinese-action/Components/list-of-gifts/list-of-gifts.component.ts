import { Component, OnInit, ViewChild } from '@angular/core';
import { Gift } from '../../../Models/gift.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftsService } from '../../../services/gifts.service';
import { Observable } from 'rxjs';
import { DonorsService } from '../../../services/donor.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx-js-style'
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

  isUniqueName: boolean = true;

  constructor(
    private router: Router,
    private giftService: GiftsService,
    private donorService: DonorsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

  ) { }
  getData() {
    this.giftService.getAll().subscribe(data => this.gifts = data)
    console.log(this.gifts);
    
  }
  ngOnInit() {
    this.getData()
    this.donorService.getAll().subscribe(data => this.donors = data);
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
      price: 10,
    };
    this.submitted = false;
    this.giftDialog = true;
  }
  deleteGiftFromCart(gift: Gift) {
    let cart = JSON.parse(sessionStorage.getItem("cart") || "[]")
    if (cart) {
      debugger
      const filterCart = cart.filter((item: any) =>{return item.gift.id != gift.id})
      sessionStorage.setItem("cart",JSON.stringify(filterCart)) 
    }
  }
  deleteSelectedGifts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected gifts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedGifts) {
          this.selectedGifts.forEach(gift => {
            this.giftService.deleteGift(gift).subscribe(data => {
              this.deleteGiftFromCart(gift)
              this.selectedGifts = null;
              this.getData()
              console.log(data);
              
              if(data){this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'gifts Deleted',
                life: 3000,
              })}
              else{
                this.messageService.add({
                  severity: 'error',
                  summary: 'error',
                  detail: 'there are yser that pay for it you cant delete this gift',
                  life: 3000,
                })
              }
              
            })
          }
          )
        }
      },
    });
  }
  exportToExcel(): void {
   
    this.donorService.getAll().subscribe(donors => {
      const dataToExport = donors.map(donor => {
        return {
          'id': donor.id,
          'first name': donor.firstName,
          'last name': donor.lastName,
          'email':donor.email
        };
      })
      
      const titleRow = ['list of donors']; 
      const subtitleRow = ['tryel']; 
       const headers = [
        'id',
          'first name',
          'last name',
          'email',
      ];
   
      // **שילוב כל הנתונים**
      const fullData = [titleRow, subtitleRow, headers, ...dataToExport.map(row => Object.values(row))];
   
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(fullData);
   
      // **מיזוג תאים לכותרות המרכזיות**
      ws['!merges'] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }, // מיזוג לכותרת הכללית
          { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } }, // מיזוג לכותרת המשנה
      ];
   
      // **עיצוב עמודות ושורות**
      ws['!cols'] = headers.map(() => ({ wpx: 150 })); // רוחב עמודות
      ws['!rows'] = [
          { hpx: 30 }, // גובה שורת כותרת כללית
          { hpx: 20 }, // גובה שורת משנה
          { hpx: 25 }, // גובה שורת כותרות
      ];
   
      // **עיצוב מותאם אישית**
      const headerStyle = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'D3D3D3' } } // אפור בהיר
      };
      const titleStyle = {
          font: { bold: true, sz: 16 }, // פונט גדול ומודגש
          alignment: { horizontal: 'left' } // יישור לשמאל
      };
      const subtitleStyle = {
          font: { italic: true, sz: 12 }, // פונט נטוי וקטן יותר
          alignment: { horizontal: 'left' } // יישור לשמאל
      };
   
      // **החלת עיצוב על התאים**
      ws['A1'].s = titleStyle; // עיצוב כותרת כללית
      ws['A2'].s = subtitleStyle; // עיצוב כותרת המשנה
      headers.forEach((header, index) => {
          const cellAddress = XLSX.utils.encode_cell({ r: 2, c: index });
          ws[cellAddress].s = headerStyle; // עיצוב כותרות העמודות
      });
   
      XLSX.utils.book_append_sheet(wb, ws, 'donors');
      XLSX.writeFile(wb, 'donors.xlsx');
   
      
      })
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
      accept: async () => {
        this.giftService.deleteGift(gift).subscribe(data => {
          this.deleteGiftFromCart(gift)
          this.getData()
          console.log(data);
              
              if(data){this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'gifts Deleted',
                life: 3000,
              })}
              else{
                this.messageService.add({
                  severity: 'error',
                  summary: 'error',
                  detail: 'there are user that pay for it you cant delete this gift',
                  life: 3000,
                })
              }
        })

        
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

        this.gift.imgUrl = e.target.result; // כאן אתה יכול לשמור את שם הקובץ במודל שלך

      };


      reader.readAsDataURL(file); // קורא את הקובץ כ-data URL

    }

  }




  savegift() {
    this.submitted = true;
    if (this.gift.name?.trim() && this.gift.price && this.gift.price >= 10
      && this.gift.description?.trim() && this.isUniqueName == true) {
      if (this.gift.id) {
        this.giftService.UppdateGift(this.gift).subscribe(data => {
          this.getData()
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'gift Updated',
            life: 3000,
          });
        })
      } else {
        this.giftService.creatGift(this.gift).subscribe(data => {
          this.getData()
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'gift Created',
            life: 3000,
          });
        });

      }
    } else {
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
      price: 10,
    };
    this.isUniqueName = true

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
  todonors() {
    this.router.navigate(['/donors', { id: 123 }]);
  }
  checkUniqueName() {
    this.giftService.isUniqueName(this.gift).subscribe(data => {
      this.isUniqueName = data;
      console.log(data);

    })
  }
}
