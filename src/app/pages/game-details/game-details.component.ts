import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  currentUserId: any
  currentUserData: any
  gamePurchased: boolean = false;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router, private authService: AuthService) {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe((gameData: any) => {
          if (gameData) {
            this.gameData = gameData;
            this.afAuth.authState.subscribe((user) => {
              this.currentUserId = user?.uid;
              this.firebaseService.getUserById(this.currentUserId).subscribe((userData: any) => {
                this.currentUserData = userData;
              });
            })
            this.firebaseService.getUserById(this.gameData.creatorId).subscribe((userData: any) => {
              this.creatorUserData = userData;
              this.checkGamePurchased();
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
    this.firebaseService.getRandomGames(3).subscribe((randomGames: any[]) => {
      console.log(randomGames);
      this.randomGames = randomGames;
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

  async buyGame() {
    try {
      const userBalance = this.currentUserData.balance || 0;
      const gamePrice = this.gameData.price || 0;

      if (userBalance >= gamePrice) {
        const updatedBalance = userBalance - gamePrice;
        this.firebaseService.updateBalance(updatedBalance)
        this.firebaseService.addToPurchasedGames(this.currentUserId, this.gameId)
        console.log("Succesfully Buyed Game")
        this.gamePurchased = true;
      } else {
        console.error('Yetersiz bakiye.');
      }
    } catch (error) {
      console.error('Oyun satın alınırken bir hata oluştu:', error);
    }
  }
  checkGamePurchased() {
    const currentUserId = this.authService.currentUserId;
    if (currentUserId) {
      this.firebaseService.getUserById(currentUserId).subscribe((userData: any) => {
        const purchasedGames = userData.purchasedGames || [];
        this.gamePurchased = purchasedGames.includes(this.gameId);
      });
    } else {
      this.gamePurchased = false;
    }
  }
}


