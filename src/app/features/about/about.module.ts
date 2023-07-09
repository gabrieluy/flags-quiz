import { AppRoutingModule } from '@app/app-routing.module';
import { CardComponent } from '@ui/card/card.component';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  exports: [AboutComponent],
  providers: [],
  imports: [CardComponent, CommonModule, AppRoutingModule, ButtonModule, TranslocoModule],
})
export class AboutModule {}
