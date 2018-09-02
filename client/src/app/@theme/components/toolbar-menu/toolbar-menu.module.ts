import { NgModule } from '@angular/core';
import { ToolbarMenuComponent } from './toolbar-menu.component';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatTooltipModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ThemePickerModule } from '../theme-picker/theme-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    ThemePickerModule,
    CommonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [ToolbarMenuComponent],
  declarations: [ToolbarMenuComponent],
  bootstrap: [ToolbarMenuComponent]
})
export class ToolbarMenuModule { }
