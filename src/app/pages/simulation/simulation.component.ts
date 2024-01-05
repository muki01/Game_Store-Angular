import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  categorizedGames: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.fetchGames()
  }

  async fetchGames() {
    try {
      this.firestoreService.getGamesByCategory("simulation").then((games: any[]) => {
        this.categorizedGames = games;
      });
    } catch (error) {
      console.error(error)
    }
  }
}
