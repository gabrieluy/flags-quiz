import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from '../ui/card/card.component';
import { TranslocoModule } from '@ngneat/transloco';
import { TitleComponent } from '../ui/title/title.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [],
  imports: [CardComponent, TitleComponent, CommonModule, AppRoutingModule, ButtonModule, TranslocoModule],
})
export class HomeModule {}
