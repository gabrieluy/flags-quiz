import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'fq-continents-picker',
  standalone: true,
  imports: [CommonModule, CheckboxModule, ReactiveFormsModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [formGroup]="parentForm" *transloco="let t; read: 'continents'">
      <div class="flex flex-wrap justify-content-center gap-3">
        <div *ngFor="let continent of continents" class="field-checkbox">
          <p-checkbox
            [name]="continent"
            [value]="continent"
            [formControlName]="controlName"
            [inputId]="continent"
            (onChange)="updateParentForm()"></p-checkbox>
          <label [for]="continent">{{ t(continent) }}</label>
        </div>
      </div>
    </ng-container>
  `,
})
export class ContinentsPickerComponent {
  @Input() parentForm!: FormGroup;
  @Input() continents: string[] = [];
  @Input() controlName!: string;

  public updateParentForm(): void {
    const selectedContinents = this.continents.filter(c =>
      this.parentForm.controls[this.controlName].value.includes(c)
    );
    this.parentForm.controls[this.controlName].setValue(selectedContinents);
  }
}
