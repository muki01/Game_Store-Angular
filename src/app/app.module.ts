import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { BannerComponent } from './components/banner/banner.component';
import { ArticleComponent } from './components/main/section/article/article.component';
import { AsideComponent } from './components/main/aside/aside.component';
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

import { GameService } from './services/game.service';
import { SectionComponent } from './components/main/section/section.component';
import { CreateComponent } from './pages/create/create.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
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
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD5BDXxV3lFY9vt4BLHsuOLSbvXjQ8RwDk",
      authDomain: "db-for-project-923e8.firebaseapp.com",
      projectId: "db-for-project-923e8",
      storageBucket: "db-for-project-923e8.appspot.com",
      messagingSenderId: "646171514046",
      appId: "1:646171514046:web:5e85cd53089e67e46fbaef",
      measurementId: "G-CNBQFKKZW9"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [GameService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
