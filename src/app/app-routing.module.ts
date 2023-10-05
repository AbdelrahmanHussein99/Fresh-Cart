import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: "", loadComponent: () => import("./layouts/blank-layout/blank-layout.component").then((m) => m.BlankLayoutComponent),canActivate:[authGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadComponent: () => import("./Components/home/home.component").then((m) => m.HomeComponent), title: 'Home' },
      { path: "products", loadComponent: () => import("./Components/products/products.component").then((m) => m.ProductsComponent), title: 'Products' },
      { path: "productdetails/:id", loadComponent: () => import("./Components/details/details.component").then((m) => m.DetailsComponent), title: 'product Details' },
      { path: "brands", loadComponent: () => import("./Components/brands/brands.component").then((m) => m.BrandsComponent), title: 'Brands' },
      { path: "categories", loadComponent: () => import("./Components/categories/categories.component").then((m) => m.CategoriesComponent), title: 'Categories' },
      { path: "cart", loadComponent: () => import("./Components/cart/cart.component").then((m) => m.CartComponent), title: 'Cart' },
      { path: "wishlist", loadComponent: () => import("./Components/wishlist/wishlist.component").then((m) => m.WishlistComponent), title: 'Wishlist' },
    ]
  },
  {
    path: "", loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
    { path: "", redirectTo: "signin", pathMatch: "full" },
    {path:'signin',loadComponent: () => import('./Components/signin/signin.component').then((m) => m.SigninComponent),title:'Signin'},
    {path:'signup',loadComponent: () => import('./Components/register/register.component').then((m) => m.RegisterComponent),title:'Signup'},
  ]
  },
  { path: "**", loadComponent: () => import("./Components/notfound/notfound.component").then((m) => m.NotfoundComponent), title: '404' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
