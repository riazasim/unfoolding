import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmModalModule } from 'src/app/shared/components/confirm/confirm-modal.module';
import { SpAccessMaterialPanelTableModule } from 'src/app/shared/components/material-panel-table/material-panel-table.component';
import { OffCanvasModule } from 'src/app/shared/components/offcanvas/offcanvas.component';
import { DeaCustomersFormsModule } from 'src/app/shared/components/user-forms/dea-customers-forms.module';
import { DeaCustomersTableModule } from 'src/app/shared/components/user-tables/dea-customers-table.module';
import { DeaCustomersStoreModule } from 'src/app/shared/customer-store/store.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    DeaCustomersTableModule,
    DeaCustomersFormsModule,
    DeaCustomersStoreModule,
    SpAccessMaterialPanelTableModule,
    OffCanvasModule,
    ConfirmModalModule,
    FontAwesomeModule,
    MatRippleModule
  ]
})
export class CustomersModule {}
