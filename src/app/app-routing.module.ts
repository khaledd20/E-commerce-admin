import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Component/main-layout/main-layout.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { AuthGuard } from './Services/auth-guards.service';

const routes: Routes = [
    {
    path: 'admin',
    loadChildren: () => import('./Component/auth-contain/auth-contain.module').then(m => m.AuthContainModule)
   },
  {path:'dashBoard',component:MainLayoutComponent ,canActivate:[AuthGuard], children:[
    {path:'', redirectTo:'', pathMatch:'full'},
    {
      path: 'product',
      loadChildren: () => import('./Component/products-contain/products-contain.module').then(m => m.ProductsContainModule)
    },
    {
      path: 'user',
      canActivate:[AuthGuard],
      loadChildren: () => import('./Component/users/users.module').then(m => m.UsersModule)
    }
  ]},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes )], //for debugging and logging
  exports: [RouterModule]
})
export class AppRoutingModule { }
