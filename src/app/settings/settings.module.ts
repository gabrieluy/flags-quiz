import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SettingsComponent } from './settings.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from '../ui/card/card.component';
import { SettingsService } from './settings.service';
import { TranslocoModule } from '@ngneat/transloco';
import { ContinentsPickerComponent } from './ui/continents-picker/continents-picker.component';
import { OptionWrapperComponent } from './ui/settings-option/option-wrapper.component';
import { LanguagePickerComponent } from '../ui/language-picker.ts/language-picker.component';

@NgModule({
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  providers: [SettingsService],
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SelectButtonModule,
    ButtonModule,
    TranslocoModule,
    ContinentsPickerComponent,
    OptionWrapperComponent,
    LanguagePickerComponent,
  ],
})
export class SettingsModule {}
