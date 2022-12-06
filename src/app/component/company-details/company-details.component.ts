// Angular imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
// Local imports
import {CompanyService} from '../../service/company.service';
import {Company} from '../../model/company';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: Company;
  goBackUrl = '..';

  constructor(private companyService: CompanyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const name: string = this.route.snapshot.paramMap.get('id');
    this.companyService.get(name).subscribe(data => this.company = data);
  }
}
