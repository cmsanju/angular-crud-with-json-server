import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  stock: Stock;
  goBackUrl = '..';

  constructor(private countryService: StockService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const name: string = this.route.snapshot.paramMap.get('id');
    this.countryService.get(name).subscribe(data => this.stock = data);
  }

}
