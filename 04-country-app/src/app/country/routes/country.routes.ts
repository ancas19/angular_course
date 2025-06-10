import { Routes } from "@angular/router";
import { CountryLayoutPageComponent } from "../layaouts/country-layaout-page/country-layout-page.component";
import { ByCapitalPageComponent } from "../pages/by-capital-page/by-capital-page.component";


export const countryRoutes: Routes=[
    {
        path:'',
        component: CountryLayoutPageComponent,
        children:[
            {
                path:'by-capital',
                component: ByCapitalPageComponent
            },
            {
                path:'**',
                redirectTo: 'by-capital'
            }
        ],
        
    
    }

]

export default countryRoutes;