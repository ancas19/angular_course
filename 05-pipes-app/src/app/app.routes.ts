import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'basic',
        title: 'Basic pipes',
        loadComponent: () => import('./pages/basic-pages/basic-pages.component')
    },
    {
        path: 'numbers',
        title: 'Numbers pipes',
        loadComponent: () => import('./pages/numbers-page/numbers-page.component')
    },
    {
        path: 'uncommon',
        title: 'Uncommon pipes',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page.component')
    },
    {
        path: 'custom',
        title: 'Custom pipes',
        loadComponent: () => import('./pages/custom-page/custom-page.component')
    },
    {
        path: '**',
        redirectTo: 'basic'
    }
];
