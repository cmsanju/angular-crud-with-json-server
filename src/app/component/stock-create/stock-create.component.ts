import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Company } from 'src/app/model/company';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {

  ngOnInit(): void {
    
  }

  @Input() showDialog: boolean;
  @Input() header: string;
  stock: Stock;
  stockForm: FormGroup;

  constructor(private primengConfig: PrimeNGConfig, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.stock = this.config.data.stock;
    this.stockForm = new FormGroup({
      id: new FormControl({value: this.stock.id, disabled: this.stock.id != null}, [Validators.required]),
      name: new FormControl(this.stock.name, [Validators.required]),
      price: new FormControl(this.stock.price, [Validators.required]),
      priceDate: new FormControl(this.stock.priceDate, [Validators.required]),
      priceTime: new FormControl(this.stock.priceTime, [Validators.required])
      
    });
    this.primengConfig.ripple = true;
  }

  onSubmit() {
    this.formValuesToCountry();
    this.ref.close(this.stock);
  }

  hideDialog() {
    this.ref.close(null);
  }

  formValuesToCountry() {
    this.stock = this.stockForm.getRawValue();
  }

}
