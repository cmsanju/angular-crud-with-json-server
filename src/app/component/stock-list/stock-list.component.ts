import { Component, OnInit,Input,Output,EventEmitter,Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Company } from 'src/app/model/company';
import { Stock } from 'src/app/model/stock';

import { StockService } from 'src/app/service/stock.service';

import { StockCreateComponent } from '../stock-create/stock-create.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  stocks: Stock[];
  selectedStock: Stock;
 searchword:String="";
  @Output() searchcriteria = new EventEmitter<String>();
searchThis() {
    this.searchcriteria.emit(this.searchword)
}

  constructor(private stockService: StockService, private router: Router, private primengConfig: PrimeNGConfig, private messageService: MessageService, public dialogService: DialogService) {
  }

  ngOnInit() {
    this.stockService.getAll().subscribe(data => this.stocks = data);
    this.primengConfig.ripple = true;
  }

  onRowSelect($event: any) {
    this.router.navigate(['stocks', $event.data.id]);
  }

  deleteStock(stock: Stock) {
    this.stockService.delete(stock.id).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Stock deleted'});
    });
  }
  openStocks(){
    this.router.navigate(['/stocks']);
  }
  openCreateModal() {
    const ref = this.openModal(new Stock(), 'Add Stock');
    ref.onClose.subscribe((stock: Stock) => {
      if (stock) {
        this.stockService.create(stock).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Stock created'});
        });
      }
    });
  }
  openEditModal(selectedStock: Stock) {
    const ref = this.openModal(selectedStock, 'Edit Stock');
    ref.onClose.subscribe((stock: Stock) => {
      if (stock) {
        this.stockService.update(stock.id, stock).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Stock updated'});
        });
      }
    });
  }
  
  openModal(stock: Stock, header: string): DynamicDialogRef {
    return this.dialogService.open(StockCreateComponent, {
      data: {stock},
      header,
      contentStyle: {'max-height': '500px', 'overflow': 'auto'},
      baseZIndex: 10000
    });
  }
}
