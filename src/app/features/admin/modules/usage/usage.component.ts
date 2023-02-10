import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, Observable } from 'rxjs';
import { DeaSubUserUsage } from 'src/app/models/user.model';
import { DeaUsageApiService } from 'src/app/services/dea-usage-api.service';
import { LoaderOrchestratorService } from 'src/app/services/loader-orchestrator.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';


@Component({
  templateUrl: './usage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host sp-access-material-panel-table {
        --app-border-radius: 40px;
      }
    `
  ]
})
export class DeaUsageComponent implements OnInit {

  public data$: Observable<DeaSubUserUsage[]>;
  public loading = true;
  public usageList: any[] = [];

  constructor(
    private readonly usageApiService: DeaUsageApiService,
              private readonly snackbarService: MatSnackBar,
              private readonly loaderOrchestrator: LoaderOrchestratorService) {
    // this.data$ = this.usageApiService.getUsageList();
  }

  ngOnInit(): void {
    this.loaderOrchestrator.setLoaderVisibility(true);
    this.getUsage();
  }

  getUsage() {
    this.usageApiService
      .getUsageList(Number(JSON.parse(sessionStorage.getItem('user')).id))
      .pipe(
        finalize(() => this.loaderOrchestrator.setLoaderVisibility(false))
      )
      .subscribe({
        next: users => {
          // this.store.dispatch(addSubUsersAction({ users }))
          this.usageList = users?.data?.items;
          console.log("getUserList", this.usageList);
        },
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
  }
  public exportUsages(): void {
    this.loaderOrchestrator.setLoaderVisibility(true);

    this.usageApiService
      .exportUserUsage()
      .pipe(
        finalize(() => this.loaderOrchestrator.setLoaderVisibility(false))
      )
      .subscribe({
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
  }
}
