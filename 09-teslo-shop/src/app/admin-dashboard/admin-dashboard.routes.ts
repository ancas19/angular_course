import { Routes } from "@angular/router";
import { AdminDashboardLayaoutComponent } from "./layaout/admin-dashboard-layaout/admin-dashboard-layaout.component";
import { ProductAdminPageComponent } from "./pages/product-admin-page/product-admin-page.component";
import { IsAdminGuard } from "@auth/guards/is-admin.guard";
import { ProductsAdminPageComponent } from "./pages/products-admin-page/products-admin-page.component";


export const adminDashboardRoutes: Routes = [
  {
    path:'',
    component:AdminDashboardLayaoutComponent,
    canMatch:[IsAdminGuard  ],
    children:[
      {
        path:'products',
        component:ProductsAdminPageComponent
      },
      {
        path:'product/:id',
        component:ProductAdminPageComponent
      },
      {
        path:'**',
        redirectTo:'products'
      }
    ]
  }
];



export default adminDashboardRoutes;
