import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-horror',
  templateUrl: './horror.component.html',
  styleUrls: ['./horror.component.css'],

})
export class HorrorComponent implements OnInit {
  categorizedGames: any[] = [];
  popularGames: any[] = [];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getGamesByCategory("horror").subscribe((games: any[]) => {
      this.categorizedGames = games;
    });
    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
  }
}
