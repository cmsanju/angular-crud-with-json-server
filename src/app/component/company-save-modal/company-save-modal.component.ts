// Angular imports
import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// PrimeNG imports
import {PrimeNGConfig} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
// Local imports
import {Company} from '../../model/company';

@Component({
  selector: 'company-save-modal',
  templateUrl: './company-save-modal.component.html',
  styleUrls: ['./company-save-modal.component.scss']
})
export class CompanySaveModalComponent {
  @Input() showDialog: boolean;
  @Input() header: string;
  company: Company;
  countryForm: FormGroup;

  constructor(private primengConfig: PrimeNGConfig, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.company = this.config.data.company;
    this.countryForm = new FormGroup({
      id: new FormControl({value: this.company.id, disabled: this.company.id != null}, [Validators.required]),
      name: new FormControl(this.company.name, [Validators.required]),
      code: new FormControl(this.company.code, [Validators.required]),
      turnover: new FormControl(this.company.turnover, [Validators.required]),
      ceo: new FormControl(this.company.ceo, [Validators.required]),
      boardOfDirectors: new FormControl(this.company.boardOfDirectors, [Validators.required]),
      stockExchangeNames: new FormControl(this.company.stockExchangeNames, [Validators.required]),
      sectorName:new FormControl(this.company.sectorName, [Validators.required]),
      description:new FormControl(this.company.description, [Validators.required])
    });
    this.primengConfig.ripple = true;
  }

  onSubmit() {
    this.formValuesToCountry();
    this.ref.close(this.company);
  }

  hideDialog() {
    this.ref.close(null);
  }

  formValuesToCountry() {
    this.company = this.countryForm.getRawValue();
  }

}
