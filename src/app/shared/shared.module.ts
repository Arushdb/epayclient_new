import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { alertComponent } from './alert/alert.component'
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from  '@angular/material/datepicker';  
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
   
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomComboboxComponent } from './custom-combobox/custom-combobox.component';
import { MessageComponent } from '../shared/message/message.component';


import { AgGridModule } from 'ag-grid-angular';

import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
   // common components
    alertComponent,
    ProgressSpinnerComponent,
    CustomComboboxComponent,
    MessageComponent,
   
     ListComponent
   
    
  ],
  imports: [
  
    CommonModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridModule,

   

   FormsModule,
   ReactiveFormsModule,
   HttpClientModule
   //AgGridModule.withComponents([]),
  ],
  exports: [
     // common componentsc
    
    alertComponent,
    ProgressSpinnerComponent,
    CustomComboboxComponent,
    MessageComponent,

  

    
    //shared Module
    CommonModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,

    FormsModule,
    ReactiveFormsModule,
   //AgGridModule.withComponents([]),

    AgGridModule

  ]
})
export class SharedModule { }
