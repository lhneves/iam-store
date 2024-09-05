import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIconComponent, RouterOutlet],
  viewProviders: [provideIcons({ heroUserCircle })],
})
export class AppComponent {}
