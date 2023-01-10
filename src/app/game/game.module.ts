import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FlagGridComponent } from '../ui/flag-grid/flag-grid.component';

@NgModule({
  imports: [CommonModule, ButtonModule, MessageModule, FlagGridComponent],
  declarations: [GameComponent],
  exports: [GameComponent],
  providers: [MessageService],
})
export class GameModule {}
