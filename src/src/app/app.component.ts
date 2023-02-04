import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderOrchestratorService, LoaderState } from './services/loader-orchestrator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly loaderState: Observable<LoaderState>;

  constructor(private readonly loaderOrchestrator: LoaderOrchestratorService) {
    this.loaderState = loaderOrchestrator.getLoaderState();
  }
}
