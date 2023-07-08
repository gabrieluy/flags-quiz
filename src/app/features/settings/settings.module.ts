import { MultiselectPickerComponent } from '@shared-ui/multiselect-picker/multiselect-picker.component';
import { SettingsService } from '@core/services/settings/settings.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '@shared-ui/card/card.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';

import { LanguagePickerComponent } from './ui/language-picker.ts/language-picker.component';
import { OptionWrapperComponent } from './ui/settings-option/option-wrapper.component';
import { SettingsComponent } from './settings.component';

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
    MultiselectPickerComponent,
    OptionWrapperComponent,
    LanguagePickerComponent,
  ],
})
export class SettingsModule {}
