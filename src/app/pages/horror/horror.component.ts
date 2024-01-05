import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-horror',
  templateUrl: './horror.component.html',
  styleUrls: ['./horror.component.css'],

})
export class HorrorComponent implements OnInit {
  categorizedGames: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.fetchGames()
  }

  async fetchGames() {
    try {
      this.firestoreService.getGamesByCategory("horror").then((games: any[]) => {
        this.categorizedGames = games;
      });
    } catch (error) {
      console.error(error)
    }
  }
}
