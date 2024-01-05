import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-survival',
  templateUrl: './survival.component.html',
  styleUrls: ['./survival.component.css']
})
export class SurvivalComponent implements OnInit {
  categorizedGames: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.fetchGames()
  }

  async fetchGames() {
    try {
      this.firestoreService.getGamesByCategory("survival").then((games: any[]) => {
        this.categorizedGames = games;
      });
    } catch (error) {
      console.error(error)
    }
  }
}
