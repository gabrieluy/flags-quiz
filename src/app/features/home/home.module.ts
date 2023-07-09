import { AppRoutingModule } from '@app/app-routing.module';
import { CardComponent } from '@ui/card/card.component';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [],
  imports: [CardComponent, CommonModule, AppRoutingModule, ButtonModule, TranslocoModule],
})
export class HomeModule {}
