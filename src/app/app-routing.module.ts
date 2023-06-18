import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'game', pathMatch: 'full', component: GameComponent },
  { path: 'settings', pathMatch: 'full', component: SettingsComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
