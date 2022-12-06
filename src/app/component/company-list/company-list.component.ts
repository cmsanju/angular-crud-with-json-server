// Angular imports
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// PrimeNG imports
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';



// Local imports
import {Company} from '../../model/company';
import { Stock } from 'src/app/model/stock';
import {CompanyService} from '../../service/company.service';
import {CompanySaveModalComponent} from '../company-save-modal/company-save-modal.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];
  
  selectedCompany: Company;
  
  

  constructor(private companyService: CompanyService, private router: Router, private primengConfig: PrimeNGConfig, private messageService: MessageService, public dialogService: DialogService) {
  }

  ngOnInit() {
    this.companyService.getAll().subscribe(data => this.companies = data);
    this.primengConfig.ripple = true;
  }

  onRowSelect($event: any) {
    this.router.navigate(['companies', $event.data.id]);
  }

  deleteCompany(company: Company) {
    this.companyService.delete(company.id).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Country deleted'});
    });
  }
  
  openCreateModal() {
    const ref = this.openModal(new Company(), 'Add Company');
    ref.onClose.subscribe((company: Company) => {
      if (company) {
        this.companyService.create(company).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company created'});
        });
      }
    });
  }

  openEditModal(selectedCompany: Company) {
    const ref = this.openModal(selectedCompany, 'Edit Company');
    ref.onClose.subscribe((company: Company) => {
      if (company) {
        this.companyService.update(company.id, company).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company updated'});
        });
      }
    });
  }

  openModal(company: Company, header: string): DynamicDialogRef {
    return this.dialogService.open(CompanySaveModalComponent, {
      data: {company},
      header,
      contentStyle: {'max-height': '500px', 'overflow': 'auto'},
      baseZIndex: 10000
    });
  }
  
}
