import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorizedGames: any[] = [];
  popularGames: any[] = [];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getGames(6).subscribe((games: any[]) => {
      console.log(games)
      this.categorizedGames = games;
    });
    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
  }
}
