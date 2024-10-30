import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Services/AuthInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './Component/side-bar/side-bar.component';
import { MainLayoutComponent } from './Component/main-layout/main-layout.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
export function tokenGetter() {
  return localStorage.getItem("tokkern");
}
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
     JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  
  ],
  providers: [
    {
      provide: 'AuthGuard',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
      },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
