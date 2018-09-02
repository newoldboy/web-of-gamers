import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from './helpers/custom-date-adapter';

import {
  DateToStringPipe,
  HoraToStringPipe,
  CapitalizeAllPipe
} from './pipes';

const pipes = [
  DateToStringPipe,
  HoraToStringPipe,
  CapitalizeAllPipe
];

import {
  DateAdapter,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatSnackBarModule,
  MatCardModule,
  MatSelectModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatTabsModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatChipsModule,
  MatMenuModule,
  MatCheckboxModule,
  MatInputModule
  
} from '@angular/material';

const modulesMaterial = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatSnackBarModule,
  MatCardModule,
  MatSelectModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatTabsModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatChipsModule,
  MatMenuModule,
  MatTableModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule
];

import { ThemePickerModule, ToolbarMenuModule } from './components';
import { PreviewMenuModule } from './components/preview-menu/preview-menu.module';

const COMPONENTS = [
  ThemePickerModule,
  ToolbarMenuModule
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, ...modulesMaterial, ...COMPONENTS, PreviewMenuModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, ...pipes, ...modulesMaterial, ...COMPONENTS, PreviewMenuModule],
  declarations: [...pipes],
  providers: [MatDatepickerModule, {provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
    };
  }
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt-br');
  }
}
