// Angular imports
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Local imports
import {CompanyListComponent} from './component/company-list/company-list.component';
import {CompanyDetailsComponent} from './component/company-details/company-details.component';
import { StockListComponent } from './component/stock-list/stock-list.component';
import { StockDetailsComponent } from './component/stock-details/stock-details.component';

const routes: Routes = [
  {path: 'companies', component: CompanyListComponent},
  {path: 'companies/:id', component: CompanyDetailsComponent},
  // {path: '**', redirectTo: '/countries'},
  {path: 'stocks', component: StockListComponent},
  {path: 'stocks/:id', component: StockDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
