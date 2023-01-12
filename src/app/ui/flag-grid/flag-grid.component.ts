import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { Country } from 'src/app/core/game_manager/interfaces/country.interface';
import { AnimateModule } from 'primeng/animate';
import { FieldsetModule } from 'primeng/fieldset';
@Component({
  selector: 'fq-flag-grid',
  standalone: true,
  imports: [CommonModule, AnimateModule, TooltipModule, FieldsetModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-fieldset [legend]="dividerText" [toggleable]="true" [styleClass]="styleClass">
      <div class="flex justify-content-evenly flex-wrap gap-2">
        <ng-container *ngFor="let country of countryList">
          <img
            class="h-4rem border-round shadow-4"
            [src]="country.flag"
            [alt]="country.translations['spa'].common"
            [pTooltip]="country.translations['spa'].common" />
        </ng-container>
      </div>
    </p-fieldset>
  `,
})
export class FlagGridComponent {
  @Input() dividerText = '';
  @Input() styleClass = '';
  @Input() countryList: Country[] = [];
}
