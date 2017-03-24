import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HousesComponent } from './houses/index';
import { ServicesComponent } from './services/index';
import { OrdersComponent } from './orders/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'houses', component: HousesComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'orders', component: OrdersComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });