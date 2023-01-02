import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter, finalize, fromEvent, map, Observable, partition, switchMap, take } from 'rxjs';
import { Nullable } from 'src/app/models/nullable.type';
import { DeaAddSubUserFormModel } from 'src/app/shared/components/user-form/add-user-prompt-form/add-user-prompt-form.model';
import { addSubUserAction, addSubUsersAction, clearSubUsersAction, deleteSubUserAction, deselectSubUserAction, selectSubUserAction, updateSubUserAction } from 'src/app/shared/user-store/actions';
// import { DeaSubUserApiService } from 'src/app/services/dea-sub-user-api.service';
import { selectAllSubUsers, selectCurrentlySelectedSubUser } from 'src/app/shared/user-store/selectors';
import { createCSVOnlyInput } from 'src/app/shared/utils/creators.functions';
import { FormDataHandler } from 'src/app/models/form-handlers';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { DeaSubUserModel } from 'src/app/models/user.model';
import { DeaAssets } from 'src/app/models/assets.type';
import { LoaderOrchestratorService } from 'src/app/services/loader-orchestrator.service';

type OffCanvasComponentType = 'invitations' | 'import' | 'newUser';

@Component({
  selector: 'dea-users',
  templateUrl: './users.component.html',
  styles: [
    `
      :host sp-access-material-panel-table {
        --app-border-radius: 40px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy, FormDataHandler<DeaAddSubUserFormModel> {

  public readonly subUsers$: Observable<ReadonlyArray<DeaSubUserModel>>;
  public readonly currentWorkingSubUser: Observable<Nullable<DeaSubUserModel>>;

  public showOffCanvas = false;
  public offCanvasComponent: OffCanvasComponentType = 'newUser';

  public readonly addUser = () => {
    this.showOffCanvas = true;
    this.offCanvasComponent = 'newUser';
  };
  public readonly downloadTemplate = () => {
    const a = document.createElement('a');
    a.download = 'users-template.csv';
    a.href = this.assetsProvider.asset('files', 'users-template.csv');
    a.click();
  };
  public readonly importUsers = () => {
    const excelOnlyInput = createCSVOnlyInput();
    fromEvent(excelOnlyInput, 'change')
      .pipe(
        take(1),
        map(() => excelOnlyInput.files),
        filter((fl: FileList | null): fl is FileList => fl !== null),
        map((fl: FileList) => fl.item(0)),
        filter((file: File | null): file is File => file !== null),
        // switchMap((file: File) => this.subUsersService.uploadExcelFile(file))
      )
      .subscribe({
        complete: () => {
          this.offCanvasComponent = 'import';
          this.changeDetector.detectChanges();
        },
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
    excelOnlyInput.click();
  };
  public readonly goToUser = (id: string | number) => {
    this.store.dispatch(selectSubUserAction({ id: Number(id) }));
    this.showOffCanvas = true;
  };
  public readonly deleteSubUser = (id: string | number) => {
    this.loaderOrchestrator.setLoaderVisibility(true);
    // this.subUsersService
    //   .deleteOne(id)
    //   .pipe(
    //     finalize(() => this.loaderOrchestrator.setLoaderVisibility(false))
    //   )
    //   .subscribe({
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
    //     complete: () => this.store.dispatch(deleteSubUserAction({ id: Number(id) }))
    //   });
  };

  constructor(
    // private readonly subUsersService: DeaSubUserApiService,
              private readonly assetsProvider: AssetsProviderService<DeaAssets>,
              private readonly snackbarService: MatSnackBar,
              private readonly loaderOrchestrator: LoaderOrchestratorService,
              private readonly changeDetector: ChangeDetectorRef,
              private readonly store: Store) {
    this.subUsers$ = this.store.select(selectAllSubUsers);
    this.currentWorkingSubUser = this.store.select(selectCurrentlySelectedSubUser);
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSubUsersAction());
  }

  ngOnInit(): void {
    this.loaderOrchestrator.setLoaderVisibility(true);
    // this.subUsersService
    //   .requestList()
    //   .pipe(
    //     finalize(() => this.loaderOrchestrator.setLoaderVisibility(false))
    //   )
    //   .subscribe({
    //     next: users => this.store.dispatch(addSubUsersAction({ users })),
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
    //   });
  }


  public closeCanvas() {
    this.showOffCanvas = false;
    this.offCanvasComponent = 'newUser';
    this.store.dispatch(deselectSubUserAction());
  }

  public handleFormData(formData: DeaAddSubUserFormModel): void {

    this.loaderOrchestrator.setLoaderVisibility(true);

    const finalizer = () => {
      this.loaderOrchestrator.setLoaderVisibility(false);
      this.closeCanvas();
    };

    const [newUser$, updateUser$] = partition(
      this.store.select(selectCurrentlySelectedSubUser)
        .pipe(
          take(1)
        ),
      (x: DeaSubUserModel | null) => x === null
    ) as unknown as [Observable<null>, Observable<DeaSubUserModel>];


    // newUser$
    //   .pipe(
    //     switchMap(() => {
    //       return this.subUsersService.addOne(formData as any)
    //         .pipe(
    //           finalize(finalizer)
    //         );
    //     })
    //   )
    //   .subscribe({
    //     next: (user: DeaSubUserModel) => this.store.dispatch(addSubUserAction({ user })),
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
    //   });

    // updateUser$
    //   .pipe(
    //     switchMap((x: DeaSubUserModel) => {
    //       return this.subUsersService.updateOne(formData as any, x.id)
    //         .pipe(
    //           finalize(finalizer)
    //         );
    //     })
    //   )
    //   .subscribe({
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
    //     next: (user: DeaSubUserModel) => {
    //       this.store.dispatch(updateSubUserAction({
    //         update: {
    //           id: user.id,
    //           changes: user
    //         }
    //       }));
    //     }
    //   });

  }

}
