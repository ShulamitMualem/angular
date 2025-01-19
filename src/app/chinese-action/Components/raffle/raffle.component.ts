import { Component, inject } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { TableModule } from 'primeng/table';
import { RaffleResponse } from '../../../Models/raffleResponse/raffleResponse.model';
import { RaffleService } from '../../../services/raffle.service';
@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrl: './raffle.component.css',

})
export class RaffleComponent {
  raffleList!: RaffleResponse[];
  raffleService: RaffleService= inject(RaffleService)
 loadData() {
      this.raffleService.getRaffleResponseList().subscribe((data) => (this.raffleList = data));
  }
}
