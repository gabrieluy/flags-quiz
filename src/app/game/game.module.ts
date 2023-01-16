import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FlagGridComponent } from '../ui/flag-grid/flag-grid.component';
import { TagModule } from 'primeng/tag';
import { PointsChipComponent } from '../ui/points-chip/points-chip';
import { InfoChipComponent } from '../ui/info-chips/info-chips';
@NgModule({
  declarations: [GameComponent],
  exports: [GameComponent],
  providers: [MessageService],
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    FlagGridComponent,
    TagModule,
    PointsChipComponent,
    InfoChipComponent,
  ],
})
export class GameModule {}
