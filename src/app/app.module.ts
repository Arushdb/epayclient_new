import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { StudentfeeComponent } from './studentfee/studentfee.component';
import {SharedModule} from './shared/shared.module';
import { ApplicationfeeComponent } from './applicationfee/applicationfee.component';
import { CertificatefeeComponent } from './certificatefee/certificatefee.component';
import { HostelfeeComponent } from './hostelfee/hostelfee.component';
import { PostfeeComponent } from './postfee/postfee.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ResponseInterceptorService} from './services/response-interceptor.service';
import { BlockCopyPasteDirectiveDirective } from './block-copy-paste-directive.directive';

import { AllowNumberDirective } from './allow-number.directive';
import { SpecialCharacterDirective } from './special-character.directive';
import { ReplaceDirective } from './replace.directive';
import { ViewfeestatusComponent } from './viewfeestatus/viewfeestatus.component';
//import { FeepaymentComponent } from './feepayment/feepayment.component'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    StudentfeeComponent,
    ApplicationfeeComponent,
    CertificatefeeComponent,
    HostelfeeComponent,
    PostfeeComponent,
    BlockCopyPasteDirectiveDirective,
    
    AllowNumberDirective,
    SpecialCharacterDirective,
    ReplaceDirective,
    ViewfeestatusComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
      
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
