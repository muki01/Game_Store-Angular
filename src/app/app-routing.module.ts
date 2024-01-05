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
import { EditComponent } from './pages/edit/edit.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
  { path: 'edit/:gameId', component: EditComponent },
  { path: 'users/profile/:userId', component: ProfileComponent },
  { path: 'game/:gameId', component: GameDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
