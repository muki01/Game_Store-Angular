import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionComponent } from './pages/action/action.component';
import { AdventureComponent } from './pages/adventure/adventure.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { SurvivalComponent } from './pages/survival/survival.component';
import { SportsComponent } from './pages/sports/sports.component';
import { RacingComponent } from './pages/racing/racing.component';
import { HorrorComponent } from './pages/horror/horror.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateComponent } from './pages/create/create.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games/action', component: ActionComponent },
  { path: 'games/adventure', component: AdventureComponent },
  { path: 'games/simulation', component: SimulationComponent },
  { path: 'games/survival', component: SurvivalComponent },
  { path: 'games/sports', component: SportsComponent },
  { path: 'games/racing', component: RacingComponent },
  { path: 'games/horror', component: HorrorComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'games/create', component: CreateComponent },
  { path: 'users/profile', component: ProfileComponent },
  { path: 'game/:id', component: GameDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
