import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [NgIconComponent, RouterLinkActive, RouterLink, AsyncPipe, NgIf],
  standalone: true,
})
export class HeaderComponent {}
