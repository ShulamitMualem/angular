import { Component, inject } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { TableModule } from 'primeng/table';
import { RaffleResponse } from '../../../Models/raffleResponse/raffleResponse.model';
import { RaffleService } from '../../../services/raffle.service';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrl: './raffle.component.css',

})
export class RaffleComponent {
  raffleList!: RaffleResponse[];
  raffleService: RaffleService= inject(RaffleService)
  globalService=inject(GlobalService)
  isLoading:boolean=false
  alowedRaffle:boolean=true
  startRaffle() {
    this.isLoading = true;
  }
 loadData() {
  this.isLoading = true;
  setTimeout(() => {
this.raffleService.getRaffleResponseList().subscribe((data) => (this.raffleList = data));
this.isLoading=false
this.alowedRaffle=false
this.globalService.setIsRaffle(true)
  }, 3000);
}
  
 
  
}
