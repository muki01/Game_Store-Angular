import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent {
  popularGames: any[] = [];
  randomGames: any[] = [];
  gameData: any = {};
  gameId: any;
  creatorUserData: any = {};

  loggedUserData: any;
  gamePurchased: boolean = false;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router, private authService: AuthService) {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe((gameData: any) => {
          if (gameData) {
            this.gameData = gameData;
            this.authService.loggedUserData$.subscribe(userData => {
              this.loggedUserData = userData;
            });
            this.firebaseService.getUserById(this.gameData.creatorId).subscribe((userData: any) => {
              this.creatorUserData = userData;
              this.checkGamePurchased();
            });
          }
        });
      }
    });

    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
    this.firebaseService.getRandomGames(3).subscribe((randomGames: any[]) => {
      this.randomGames = randomGames;
    });

  }

  editGame() {
    if (this.gameData && this.gameId) {
      this.router.navigate(['/edit', this.gameId]);
    } else {
      console.error("Game ID is missing or undefined.");
    }
  }

  deleteGame() {
    const id: any = this.gameId
    this.firebaseService.deleteGame(id).then(() => {
      this.router.navigate(['/']);
    });
  }

  async buyGame() {
    try {
      const userBalance = this.loggedUserData.balance || 0;
      const gamePrice = this.gameData.price || 0;

      if (userBalance >= gamePrice) {
        const updatedBalance = userBalance - gamePrice;
        this.firebaseService.updateBalance(this.loggedUserData.userId, updatedBalance)
        this.firebaseService.addToPurchasedGames(this.loggedUserData.userId, this.gameId)
        console.log("Succesfully Buyed Game")
        this.gamePurchased = true;
      } else {
        console.error('Insufficient balance.');
      }
    } catch (error) {
      console.error('An error occurred while purchasing the game:', error);
    }
  }
  checkGamePurchased() {
    const loggedUserData = this.loggedUserData.userId;
    if (loggedUserData) {
      this.firebaseService.getUserById(loggedUserData).subscribe((userData: any) => {
        const purchasedGames = userData.purchasedGames || [];
        this.gamePurchased = purchasedGames.includes(this.gameId);
      });
    } else {
      this.gamePurchased = false;
    }
  }
}


