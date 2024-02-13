import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  randomGames: any = [];

  currentGameData: any = {};
  gamePurchased: boolean = false;
  gameLiked: boolean = false;

  isAdmin: boolean = false;
  isCreator: boolean = false;

  creatorUserData: any = {};
  loggedUserData: any = null;

  errorMessage: string | null = null;

  isLoadingGameData: boolean = true
  isLoadingRandomGames: boolean = true

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const gameId = params.get('gameId');
      if (gameId) {
        this.firestoreService.getGameById(gameId).then((gameData: any) => {
          this.currentGameData = { id: gameId, ...gameData };
          if (this.currentGameData) {
            this.isLoadingGameData = false
          }
          this.firestoreService.getUserById(this.currentGameData.creatorId).then((userData: any) => {
            this.creatorUserData = userData;
          });
          this.authService.loggedUser$.subscribe((user: any) => {
            const userId = user?.uid
            if (userId) {
              this.firestoreService.getUserById(userId).then((userData: any) => {
                this.loggedUserData = { id: userId, ...userData };
                this.gamePurchased = !!this.loggedUserData.purchasedGames.includes(this.currentGameData.id)
                this.gameLiked = !!this.loggedUserData.likedGames.includes(this.currentGameData.id)
                if (this.loggedUserData.id == this.currentGameData.creatorId) {
                  this.isCreator = true;
                }
                if (this.loggedUserData.role == "admin") {
                  this.isAdmin = true;
                }
              });
            }
          });
        });
      }
    });

    this.firestoreService.getRandomGames(3).then((randomGames: any) => {
      this.randomGames = randomGames;
      this.isLoadingRandomGames = false;
    });
  }

  async likeGame() {
    if (this.gameLiked) {
      this.loggedUserData.likedGames = this.loggedUserData.likedGames.filter((likedGame: any) => likedGame !== this.currentGameData.id);
      this.currentGameData.likes = this.currentGameData.likes - 1;
      this.gameLiked = false
      console.log("Unliked Successfully")
    } else {
      this.loggedUserData.likedGames.push(this.currentGameData.id);
      this.currentGameData.likes = this.currentGameData.likes + 1;
      this.gameLiked = true
      console.log("Liked Successfully")
    }

    await this.firestoreService.updateGame({ likes: this.currentGameData.likes }, this.currentGameData.id);
    await this.firestoreService.updateUser({ likedGames: this.loggedUserData.likedGames }, this.loggedUserData.id);
  }

  editGame() {
    if (this.currentGameData && this.currentGameData.id) {
      this.router.navigate(['/edit', this.currentGameData.id]);
    } else {
      console.error("Game ID is missing or undefined.");
    }
  }

  deleteGame() {
    this.firestoreService.deleteGame(this.currentGameData.id)
    this.router.navigate(['/']);
  }

  async buyGame() {
    try {
      const userBalance = this.loggedUserData?.balance || 0;
      const gamePrice = this.currentGameData?.price || 0;

      if (userBalance >= gamePrice) {
        const updatedBalance = userBalance - gamePrice;
        await this.firestoreService.updateBalance(this.loggedUserData.id, updatedBalance);
        await this.firestoreService.addToPurchasedGames(this.loggedUserData.id, this.currentGameData.id);
        console.log("Successfully Bought Game");
        this.gamePurchased = true;
      } else {
        this.showErrorMessage('Insufficient balance !')
        console.error('Insufficient balance !');
      }
    } catch (error) {
      console.error('An error occurred while purchasing the game:', error);
    }
  }

  private showErrorMessage(message: string | null) {
    if (message !== null) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    }
  }
}


