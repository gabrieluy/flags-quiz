import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FlagGridComponent } from '../ui/flag-grid/flag-grid.component';
import { InfoBtnComponent } from '../ui/info-btn/info-btn.component';
import { TagModule } from 'primeng/tag';

@NgModule({
  imports: [CommonModule, ButtonModule, MessageModule, FlagGridComponent, InfoBtnComponent, TagModule],
  declarations: [GameComponent],
  exports: [GameComponent],
  providers: [MessageService],
})
export class GameModule {}
