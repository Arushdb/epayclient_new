import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationfeeComponent } from './applicationfee/applicationfee.component';
import { CertificatefeeComponent } from './certificatefee/certificatefee.component';
import { HostelfeeComponent } from './hostelfee/hostelfee.component';
import { MainComponent } from './main/main.component';
import { PostfeeComponent } from './postfee/postfee.component';
import { StudentfeeComponent } from './studentfee/studentfee.component';

const routes: Routes = [
  
    //basic routes
    {path:'',redirectTo:'main',pathMatch:'full'},
    {path:'main',component:MainComponent},
    {path:'student',component:StudentfeeComponent,data:{cat:"CON"}},
  
    {path:'applicationfee',component:ApplicationfeeComponent,data:{feetype:"appfee",cat:"appfee"}},
    {path:'newadmissionfee',component:ApplicationfeeComponent,data:{feetype:"newadm",cat:"newadm"}},
    {path:'migcertificate',component:CertificatefeeComponent,data:{certificatetype:"mig",cat:"CER"}},
    {path:'degcertificate',component:CertificatefeeComponent,data:{certificatetype:"deg",cat:"CER"}},
    {path:'trncertificate',component:CertificatefeeComponent,data:{certificatetype:"trn",cat:"CER"}},
    {path:'procertificate',component:CertificatefeeComponent,data:{certificatetype:"pro",cat:"CER"}},
    {path:'rescertificate',component:CertificatefeeComponent,data:{certificatetype:"res",cat:"CER"}},
    {path:'hostelfee',component:HostelfeeComponent ,data:{cat:"HOS"}},
    {path:'postfee',component:PostfeeComponent,data:{cat:"POS"}},
    {path:'**',component:MainComponent}

   
    
    
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
