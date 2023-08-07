import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent {
  newGame: any = {
    name: '',
    type: '',
    image: '',
    description: '',
    price: '',
    creatorId: '',
    date: ''
  };

  constructor(private firebaseService: FirebaseService, private datePipe: DatePipe, private router: Router, private authService: AuthService) { }

  async onSubmit() {
    this.newGame.date = this.getCurrentDate();
    this.newGame.creatorId = this.authService.currentUserId;

    if (this.newGame.name && this.newGame.type && this.newGame.image && this.newGame.description && this.newGame.creatorId && this.newGame.date && this.newGame.price) {
      const success = await this.firebaseService.addGame(this.newGame);
      if (success) {
        console.log('Game added successfully.');
        this.resetForm();
        this.router.navigate(['/']);
      } else {
        console.error('Error adding game.');
      }
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
      creatorId: '',
      date: ''
    };
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'MMMM d, y');
    return formattedDate || '';
  }
}