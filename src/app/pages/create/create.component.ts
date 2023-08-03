import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GameService } from '../../services/game.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent {
  newGame = {
    name: '',
    type: '',
    image: '',
    description: '',
    creator: '',
    date: ''
  };

  constructor(private firebaseService: FirebaseService,private datePipe: DatePipe,private router: Router) { }

  onSubmit() {
    this.newGame.creator = "Change This";
    this.newGame.date = this.getCurrentDate();
    if (this.newGame.name && this.newGame.type && this.newGame.image && this.newGame.description && this.newGame.creator && this.newGame.date) {
      this.firebaseService.addGame(this.newGame).then(() => {
        console.log('Game added successfully.');
        this.resetForm()
        this.router.navigate(['/']);
      }).catch(error => {
        console.error('Error adding game:', error);
      });
    } else {
      console.error('Please fill all the fields.');
    }
  }

  resetForm() {
    this.newGame = {
      name: '',
      type: '',
      image: '',
      description: '',
      creator: '',
      date: ''
    };
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'MMMM d, y');
    return formattedDate || '';
  }
}








// export class CreateComponent {
//   newGame: any = {};
//   constructor(private gameService: GameService,private datePipe: DatePipe) {}

//   addGame(): void {
//     this.newGame.creator = "Change This";
//     this.newGame.date = this.getCurrentDate();
//     this.gameService.addGame(this.newGame);
//     this.newGame = {};
//   }

//   getCurrentDate(): string {
//     const currentDate = new Date();
//     const formattedDate = this.datePipe.transform(currentDate, 'MMMM d, y');
//     console.log(formattedDate)
//     return formattedDate || '';
//   }
// }