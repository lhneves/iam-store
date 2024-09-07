import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionAddCircleOutline,
  ionArrowRedoSharp,
  ionTrashSharp,
} from '@ng-icons/ionicons';
import {
  heroUserCircle,
  heroChevronDoubleLeft,
} from '@ng-icons/heroicons/outline';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HttpClientModule, NgIconComponent, RouterOutlet],
  viewProviders: [
    provideIcons({
      heroUserCircle,
      ionArrowRedoSharp,
      ionTrashSharp,
      ionAddCircleOutline,
      heroChevronDoubleLeft,
    }),
  ],
})
export class AppComponent {}
