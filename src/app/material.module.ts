import {NgModule} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ]
})
export class MaterialModule {
}
