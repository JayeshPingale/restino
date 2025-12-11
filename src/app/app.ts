import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstPageComponent } from './components/first-page-component/first-page-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FirstPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resonantia');
}
