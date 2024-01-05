import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  randomGames: any[] = [];

  gameData: any = {};
  gameId: any;
  creatorUserData: any = {};

  loggedUserId: any;
  loggedUserData: any;
  gamePurchased: boolean = false;

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.firestoreService.getGameById(this.gameId).then((gameData: any) => {
          this.gameData = gameData;
          if (this.gameData) {
            this.firestoreService.getUserById(this.gameData.creatorId).then((userData: any) => {
              this.creatorUserData = userData;
            });
            this.authService.loggedUser$.subscribe(user => {
              this.loggedUserId = user?.uid
              if (this.loggedUserId) {
                this.firestoreService.getUserById(this.loggedUserId).then((userData: any) => {
                  this.loggedUserData = userData;
                  this.gamePurchased = !!this.loggedUserData.purchasedGames.includes(this.gameId)
                });
              }
            });
          } else {
            this.router.navigate(['/']);
          }
        });
      }
    });

    this.firestoreService.getRandomGames(3).then((randomGames: any) => {
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
    this.firestoreService.deleteGame(this.gameId)
    this.router.navigate(['/']);
  }

  async buyGame() {
    try {
      const userBalance = this.loggedUserData?.balance || 0;
      const gamePrice = this.gameData?.price || 0;

      if (userBalance >= gamePrice) {
        const updatedBalance = userBalance - gamePrice;
        await this.firestoreService.updateBalance(this.loggedUserId, updatedBalance);
        await this.firestoreService.addToPurchasedGames(this.loggedUserId, this.gameId);
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


