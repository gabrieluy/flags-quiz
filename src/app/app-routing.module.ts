import { SettingsComponent } from '@features/settings/settings.component';
import { AboutComponent } from '@features/about/about.component';
import { HomeComponent } from '@features/home/home.component';
import { GameComponent } from '@features/game/game.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'game', pathMatch: 'full', component: GameComponent },
  { path: 'settings', pathMatch: 'full', component: SettingsComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
