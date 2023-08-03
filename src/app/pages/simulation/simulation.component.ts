import { Component,OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  categorizedGames: any[] = [];
  popularGames: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getGamesByCategory("simulation",6).subscribe((games: any[]) => {
      this.categorizedGames = games;
    });
    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
  }
}
