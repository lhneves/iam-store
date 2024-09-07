import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './core/layout/content-layout/content-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/products/page/products/products.component').then(
            (m) => m.ProductPageComponent
          ),
      },
    ],
  },
  {
    path: 'product/:code',
    loadComponent: () =>
      import(
        './features/products/page/product-edit/product-edit.component'
      ).then((m) => m.ProductEditComponent),
  },
];
