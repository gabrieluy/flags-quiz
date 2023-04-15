import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { PointsChipComponent } from '../ui/chips/points-chip/points-chip';
import { InfoChipComponent } from '../ui/chips/info-chip/info-chip';
import { FlagImgComponent } from '../ui/flag-img/flag-img.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { GamePlayStatusComponent } from './game-play-status/game-play-status.component';
import { CorrectAnswerChipComponent } from './ui/correct-answer-chip/correct-answer-chip.component';
import { AnswerHistoryComponent } from './answer-history/answer-history.component';
import { CardComponent } from '../ui/card/card.component';
import { GameManagerService } from './game-manager.service';
import { AppRoutingModule } from '../app-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressPercentagePipe } from './pipes/progress-percentage.pipe';
import { ColorGradientPipe } from './pipes/color-gradient.pipe';

@NgModule({
  declarations: [
    GameComponent,
    GameSummaryComponent,
    GamePlayStatusComponent,
    AnswerHistoryComponent,
    ProgressPercentagePipe,
    ColorGradientPipe,
  ],
  exports: [GameComponent],
  providers: [GameManagerService, ProgressPercentagePipe, ColorGradientPipe],
  imports: [
    CardComponent,
    CommonModule,
    ButtonModule,
    AppRoutingModule,
    MessageModule,
    TagModule,
    PointsChipComponent,
    InfoChipComponent,
    FlagImgComponent,
    CorrectAnswerChipComponent,
    ProgressBarModule,
  ],
})
export class GameModule {}
