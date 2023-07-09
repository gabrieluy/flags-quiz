import { CorrectAnswerChipComponent } from '@ui/chips/correct-answer-chip/correct-answer-chip.component';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { GameManagerService } from '@core/services/game-manager/game-manager.service';
import { AnswerHistoryComponent } from '@ui/answer-history/answer-history.component';
import { PointsChipComponent } from '@ui/chips/points-chip/points-chip.component';
import { TimeChipComponent } from '@ui/chips/time-chip/time-chip.component';
import { InfoChipComponent } from '@ui/chips/info-chip/info-chip.component';
import { ProgressPercentagePipe } from '@pipes/progress-percentage.pipe';
import { SoundsService } from '@core/services/sounds/sounds.service';
import { FlagImgComponent } from '@ui/flag-img/flag-img.component';
import { ColorGradientPipe } from '@pipes/color-gradient.pipe';
import { SecondsToTimePipe } from '@pipes/secods-to-time.pipe';
import { CountryNamePipe } from '@pipes/country.name.pipe';
import { AppRoutingModule } from '@app/app-routing.module';
import { CardComponent } from '@ui/card/card.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { SpeedDialModule } from 'primeng/speeddial';
import { TranslocoModule } from '@ngneat/transloco';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { TagModule } from 'primeng/tag';

import { GamePlayStatusComponent } from './game-play-status/game-play-status.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { SummaryItemComponent } from './game-summary/ui/summary-item';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [GameComponent, GameSummaryComponent, GamePlayStatusComponent],
  exports: [GameComponent],
  providers: [GameManagerService, SoundsService, LocalStorageService, SecondsToTimePipe],
  imports: [
    CardComponent,
    CommonModule,
    ButtonModule,
    DialogModule,
    AppRoutingModule,
    MessageModule,
    TagModule,
    PointsChipComponent,
    TimeChipComponent,
    InfoChipComponent,
    FlagImgComponent,
    CorrectAnswerChipComponent,
    SummaryItemComponent,
    ProgressBarModule,
    SpeedDialModule,
    TranslocoModule,
    ProgressPercentagePipe,
    ColorGradientPipe,
    CountryNamePipe,
    SecondsToTimePipe,
    AnswerHistoryComponent,
  ],
})
export class GameModule {}
