import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {
  categorizedGames: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.fetchGames();
  }

  async fetchGames() {
    try {
      this.firestoreService.getGamesByCategory("adventure").then((games: any[]) => {
        this.categorizedGames = games;
      });
    } catch (error) {
      console.error(error)
    }
  }
}
