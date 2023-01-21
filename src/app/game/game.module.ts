import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AnswerHistoryComponent } from './ui/answer-history/answer-history.component';
import { TagModule } from 'primeng/tag';
import { PointsChipComponent } from '../ui/chips/points-chip/points-chip';
import { InfoChipComponent } from '../ui/chips/info-chip/info-chip';
import { CountryFlagComponent } from '../ui/country-flag/country-flag.component';
@NgModule({
  declarations: [GameComponent],
  exports: [GameComponent],
  providers: [MessageService],
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    AnswerHistoryComponent,
    TagModule,
    PointsChipComponent,
    InfoChipComponent,
    CountryFlagComponent,
  ],
})
export class GameModule {}
