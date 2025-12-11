import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstPageComponent } from './components/first-page-component/first-page-component';
import { NewCLAUDEopComponent } from './components/new-claudeop-component/new-claudeop-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FirstPageComponent,NewCLAUDEopComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resonantia');
}
