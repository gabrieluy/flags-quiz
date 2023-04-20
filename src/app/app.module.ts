import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GameModule } from './game/game.module';
import { SharedModule } from 'primeng/api';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import { TranslocoRootModule } from './transloco-root.module';
import { TRANSLOCO_PERSIST_LANG_STORAGE, TranslocoPersistLangModule } from '@ngneat/transloco-persist-lang';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    GameModule,
    HomeModule,
    SettingsModule,
    TranslocoRootModule,
    TranslocoPersistLangModule.forRoot({
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: localStorage,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
