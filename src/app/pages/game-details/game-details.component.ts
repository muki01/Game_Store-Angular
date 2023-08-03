import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  popularGames: any[] = [];
  gameId: string | null = null;
  game: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId !== null) {
      this.firebaseService.getById(this.gameId).subscribe((game: any) => {
        this.game = game;
      });
    }
  });

    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
  }
}
