import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  popularGames: any[] = [];
  randomGames: any[] = [];

  gameData: any = {};
  gameId: any;
  creatorUserData: any = {};

  loggedUserId: any;
  loggedUserData: any;
  gamePurchased: boolean = false;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe((gameData: any) => {
          this.gameData = gameData;
          if (this.gameData) {
            this.firebaseService.getUserById(this.gameData.creatorId).subscribe((userData: any) => {
              this.creatorUserData = userData;
            });
            this.authService.loggedUser$.subscribe(user => {
              this.loggedUserId = user?.uid
              if (this.loggedUserId) {
                this.firebaseService.getUserById(this.loggedUserId).subscribe((userData: any) => {
                  this.loggedUserData = userData;
                  this.gamePurchased = !!this.loggedUserData.purchasedGames.includes(this.gameId)
                });
              }
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
      const userBalance = this.loggedUserData?.balance || 0;
      const gamePrice = this.gameData?.price || 0;

      if (userBalance >= gamePrice) {
        const updatedBalance = userBalance - gamePrice;
        await this.firebaseService.updateBalance(this.loggedUserId, updatedBalance);
        await this.firebaseService.addToPurchasedGames(this.loggedUserId, this.gameId);
        console.log("Successfully Bought Game");
        this.gamePurchased = true;
      } else {
        console.error('Insufficient balance.');
      }
    } catch (error) {
      console.error('An error occurred while purchasing the game:', error);
    }
  }
}


