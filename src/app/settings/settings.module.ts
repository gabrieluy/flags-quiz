import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SettingsComponent } from './settings.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardComponent } from '../ui/card/card.component';
import { SettingsService } from './settings.service';

@NgModule({
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  providers: [SettingsService],
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SelectButtonModule,
    ButtonModule,
    CheckboxModule,
  ],
})
export class SettingsModule {}
