import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fq-language-picker',
  standalone: true,
  imports: [CommonModule, DropdownModule, TranslocoModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-dropdown
      *transloco="let t; read: 'languages'"
      [options]="languages"
      [(ngModel)]="selectedLang"
      (onChange)="changeLang()">
      <ng-template pTemplate="selectedItem">
        <div class="flex align-items-center gap-2" *ngIf="selectedLang">
          <img
            [src]="'assets/flags/4x3/' + selectedLang + '.svg'"
            [class]="'flag flag-' + selectedLang"
            style="width: 18px" />
          <div>{{ t(selectedLang) }}</div>
        </div>
      </ng-template>
      <ng-template let-lang pTemplate="item">
        <div class="flex align-items-center gap-2">
          <img [src]="'assets/flags/4x3/' + lang + '.svg'" [class]="'flag flag-' + lang" style="width: 18px" />
          <div>{{ 'languages.' + lang | transloco : {} : lang }}</div>
        </div>
      </ng-template>
    </p-dropdown>
  `,
})
export class LanguagePickerComponent implements OnInit {
  private _transloco = inject(TranslocoService);

  languages: string[] = [];
  selectedLang = '';

  public ngOnInit(): void {
    this.languages = this._transloco.getAvailableLangs() as string[];
    this.selectedLang = this._transloco.getActiveLang();
  }

  public changeLang(): void {
    this._transloco.setActiveLang(this.selectedLang);
  }
}
