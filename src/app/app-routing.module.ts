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
    {path:'student',component:StudentfeeComponent},
  
    {path:'applicationfee',component:ApplicationfeeComponent,data:{feetype:"appfee"}},
    {path:'newadmissionfee',component:ApplicationfeeComponent,data:{feetype:"newadm"}},
    {path:'migcertificate',component:CertificatefeeComponent,data:{certificatetype:"mig"}},
    {path:'degcertificate',component:CertificatefeeComponent,data:{certificatetype:"deg"}},
    {path:'trncertificate',component:CertificatefeeComponent,data:{certificatetype:"trn"}},
    {path:'procertificate',component:CertificatefeeComponent,data:{certificatetype:"pro"}},
    {path:'rescertificate',component:CertificatefeeComponent,data:{certificatetype:"res"}},
    {path:'hostelfee',component:HostelfeeComponent},
    {path:'postfee',component:PostfeeComponent}

   
    
    
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
