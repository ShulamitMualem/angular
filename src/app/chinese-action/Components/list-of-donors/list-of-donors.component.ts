import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Donor } from '../../../Models/donor/donor';
import { DonorsService } from '../../../services/donor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx-js-style'

@Component({
  selector: 'app-list-of-dodnors',
  templateUrl: './list-of-donors.component.html',
  styleUrl: './list-of-donors.component.css',
  styles: [
    `:host ::ng-deep .p-dialog .gift-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`,
  ],
})

export class ListOfDonorsComponent {
  layout: string = 'list';
  options: string[] = ['list', 'grid'];
  visible: boolean = false;

  donors!: Donor[];

  donor!: Donor;

  selectedDonors!: Donor[] | null;

  submitted: boolean = false;
  @ViewChild('dt') dt!: Table;
  constructor(
    private donorService: DonorsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
 getData()  {
 this.donorService.getAll().subscribe(data=>this.donors=data)
}
  ngOnInit() {
    this.getData()
  }
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;
    this.dt.filterGlobal(searchValue, 'contains');
  }
  openNew() {
    this.donor = {
      id: 0,
      firstName: '',
      lastName:'',
      email:'',
      myGiftsList:[]
    };
    this.submitted = false;
    this.visible = true;
  }

  deleteSelectedDonors() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected donors?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedDonors){
        this.selectedDonors.forEach(donor => {
          this.donorService.deleteDonor(donor).subscribe(data=>{ 
        
            
            this.selectedDonors = null;
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

  editdonor(donor: Donor) {
    this.donor = { ...donor };
    this.visible = true;
  }

  deleteDonor(donor: Donor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + donor.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.donorService.deleteDonor(donor).subscribe({
          next: (data) => {
          this.getData();
          this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Donor deleted',
              life: 3000,
            });
          },
          error: (e) => {
            console.error(e);  
  
            if (e.status === 400) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Cannot delete donor with gifts on his name.',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong while deleting the donor.',
                life: 3000,
              });
            }
          }
        });
      },
    });
  }
  
  hideDialog() {
    this.visible = false;
    this.submitted = false;
  }
  refreshData(refresh:boolean){
  refresh?this.getData():""
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





}
