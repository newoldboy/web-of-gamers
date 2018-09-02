import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { MatPaginatorIntl, GestureConfig } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { RoutesInterceptor } from './auth/routes.interceptor';
import { ConvertKeysHelper } from './@theme/helpers/keysToLowerCase';
import { MatPaginatorIntlCro } from './@theme/helpers/confgTextPaginator';
import { LoginComponent } from './pages/autenticacao/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
  ],
  imports: [
    ThemeModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CdkTableModule,
  ],
  providers: [
    CookieService,
    AuthService,
    RoutesInterceptor,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ConvertKeysHelper,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
