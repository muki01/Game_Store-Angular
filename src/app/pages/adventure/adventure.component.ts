import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {
  categorizedGames: any[] = [];
  popularGames: any[] = [];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getGamesByCategory("adventure", 6).subscribe((games: any[]) => {
      this.categorizedGames = games;
    });
    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
  }
}
