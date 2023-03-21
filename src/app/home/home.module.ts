import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from '../ui/card/card.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [],
  imports: [CardComponent, CommonModule, AppRoutingModule, ButtonModule],
})
export class HomeModule {}
