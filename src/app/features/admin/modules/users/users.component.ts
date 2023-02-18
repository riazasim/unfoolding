import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { DeaSubUserApiService } from 'src/app/services/dea-sub-user-api.service';

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
})
export class UsersComponent implements OnInit, OnDestroy, FormDataHandler<DeaAddSubUserFormModel> {
  userModel: any;
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
    this.subUsersService
      .deleteUser(id).subscribe((Res) => {
        {
          this.getUser()
        }
      });
  };

  constructor(
    private readonly subUsersService: DeaSubUserApiService,
    private readonly assetsProvider: AssetsProviderService<DeaAssets>,
    private readonly snackbarService: MatSnackBar,
    private _snackBar: MatSnackBar,
    private readonly loaderOrchestrator: LoaderOrchestratorService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly store: Store) {
    this.subUsers$ = this.store.select(selectAllSubUsers);
    this.currentWorkingSubUser = this.store.select(selectCurrentlySelectedSubUser);
  }
  private userId: number;
  ngOnDestroy(): void {
    this.store.dispatch(clearSubUsersAction());
  }
  public usersList: any[] = [];
  ngOnInit(): void {
    this.userId = Number(JSON.parse(sessionStorage.getItem('user')).id);
    this.loaderOrchestrator.setLoaderVisibility(true);
    this.getUser();
  }
  getUserData(data) {
    this.userModel = data;
  }
  refreshList(event) {
    this.getUser();
    this.showOffCanvas = false;
  }
  getUser() {
    this.subUsersService
      .getUserList(this.userId)
      .pipe(
        finalize(() => this.loaderOrchestrator.setLoaderVisibility(false))
      )
      .subscribe({
        next: users => {
          // this.store.dispatch(addSubUsersAction({ users }))
          this.usersList = users?.data?.items;
          console.log("user loist", this.usersList)
        },
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
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
  public searchedText(event) {
    const data = {
      data: {
        attributes: {
          searchTerm: event
        }
      }
    }
    this.subUsersService.searchUserList(data, this.userId).subscribe((Response) => {
      this.usersList = Response?.data?.items;
    })
  }
  public formDataToPass;
  public formDataToinvite;
  getFilesToUpload(formData) {
    this.formDataToPass = formData;
    this.offCanvasComponent = 'import';
  }
  public emailsForInvite: Array<any> = [];
  passFormData(event) {
    this.subUsersService.uploadMedia(event, this.userId).subscribe((Response) => {
      console.log("Response of upload media API", Response);
      if (Response.data) {
        this.emailsForInvite = Response.data.items ? Response.data.items : [];
      }

      this.offCanvasComponent = 'invitations';
      this.changeDetector.detectChanges();
      this._snackBar.open('Import User', 'Successfully', {
        duration: 3000
      });
    },
      (Error) => {
        console.log("API error of upload media", Error);
      })
  }
  passForminvition(event) {
    this.subUsersService.sendinvite(event).subscribe((Response) => {
      console.log("Response of upload media API", Response);
      this.offCanvasComponent = 'newUser';
      this._snackBar.open('Email Invites sent', 'Successfully', {
        duration: 3000
      });
    },
      (Error) => {
        this._snackBar.open('Something went wrong', 'Error', {
          duration: 3000
        });
        console.log("API error of upload media", Error);
      })
  }
  getEmailsListToInvite(event) {
    this.passForminvition(event);
  }
  getCancelRequest(event) {
    this.offCanvasComponent = "newUser";
  }
}
