import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent {
  popularGames: any[] = [];
  gameData: any = {};
  gameId: any;
  userData: any = {};

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe((gameData: any) => {
          if (gameData) {
            this.gameData = gameData;
            this.firebaseService.getUserById(this.gameData.creatorId).subscribe((userData: any) => {
              this.userData = userData;
            });
          } else {
            console.error("Geçerli bir oyun bulunamadı.");
          }
        });
      }
    });

    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
  }

  editGame() {
    if (this.gameData && this.gameId) {
      this.router.navigate(['/edit', this.gameId]);
    } else {
      console.error("Oyun kimliği eksik veya tanımlanmamış.");
    }
  }

  deleteGame() {
    const id: any = this.gameId
    this.firebaseService.deleteGame(id).then(() => {
      this.router.navigate(['/']);
    });
  }
}
