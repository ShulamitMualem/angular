import { Component, inject } from '@angular/core';
import { RaffleService } from '../../../services/raffle.service';
import { GlobalService } from '../../../services/global.service';
import { BehaviorSubject, Observable, map, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
raffleService =inject(RaffleService)
globalService =inject(GlobalService)
dateOfRaffle!:Date

// ngOnInit(){
//   this.raffleService.getDateOfRaffle().subscribe(data=>{this.dateOfRaffle=data})
// }

title = 'Countdown-Timer-Pipe';
  dueDate = '2026-11-30T00:00:00' // Also, Works with YYYY-MM-DDTHH:mm:ss.msz date format.
  pauseTimerSubject = new BehaviorSubject<boolean>(false);
  isPaused = false;

  ngOnInit(): void {
    this.raffleService.getDateOfRaffle().subscribe(data=>{this.dueDate=data.toString()})
    this.pauseTimerSubject.subscribe(v => {
      this.isPaused = v;
    })
  }
  pauseTime() {
    this.pauseTimerSubject.next(true);
  }
}


