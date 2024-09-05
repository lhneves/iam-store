import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionArrowRedoSharp, ionTrashSharp } from '@ng-icons/ionicons';
import { heroUserCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIconComponent, RouterOutlet],
  viewProviders: [
    provideIcons({ heroUserCircle, ionArrowRedoSharp, ionTrashSharp }),
  ],
})
export class AppComponent {}
