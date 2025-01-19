import { Component, inject } from '@angular/core';
import { Gift } from '../../../Models/gift.model';
import { GiftsService } from '../../../services/gifts.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-gifts',
  templateUrl: './buy-gifts.component.html',
  styleUrl: './buy-gifts.component.scss',
  // providers: [GiftService],
})
export class BuyGiftsComponent {
  layout: string = 'list';

  gifts!: Gift[];
  giftService:GiftsService = inject(GiftsService)
  // constructor(private giftService: GiftService) {}

  ngOnInit() {
    // data.slice(0, 12)
      this.giftService.getAll().subscribe((data) => (this.gifts = data));
  }

  // getSeverity(gift: Gift) {
  //     switch (product.inventoryStatus) {
  //         case 'INSTOCK':
  //             return 'success';

  //         case 'LOWSTOCK':
  //             return 'warning';

  //         case 'OUTOFSTOCK':
  //             return 'danger';

  //         default:
  //             return null;
  //     }
  // };


}

// @Component({
//     selector: 'data-view-layout-demo',
//     templateUrl: './data-view-layout-demo.html',
//     standalone: true,
//     imports: [
//       DataViewModule,
//       TagModule,
//       RatingModule,
//       ButtonModule,
//       CommonModule,
//     ],
//     providers: [ProductService],
// })
// export class DataViewLayoutDemo {
   
// }