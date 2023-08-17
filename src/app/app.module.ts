import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { ArticleComponent } from './components/section/article/article.component';
import { AsideComponent } from './components/aside/aside.component';
import { HomeComponent } from './pages/home/home.component';
import { ActionComponent } from './pages/action/action.component';
import { AdventureComponent } from './pages/adventure/adventure.component';
import { HorrorComponent } from './pages/horror/horror.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { SurvivalComponent } from './pages/survival/survival.component';
import { SportsComponent } from './pages/sports/sports.component';
import { RacingComponent } from './pages/racing/racing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { SectionComponent } from './components/section/section.component';
import { CreateComponent } from './pages/create/create.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { EditComponent } from './pages/edit/edit.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ArticleComponent,
    AsideComponent,
    HomeComponent,
    ActionComponent,
    AdventureComponent,
    HorrorComponent,
    SimulationComponent,
    SurvivalComponent,
    SportsComponent,
    RacingComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SectionComponent,
    CreateComponent,
    GameDetailsComponent,
    EditComponent,
    SearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
