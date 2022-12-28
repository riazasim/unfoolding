import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeaUsageComponent } from './usage.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DeaUsageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsageRoutingModule {}
