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
  loggedUserId: any
  newGame: any = {
    name: '',
    type: '',
    image: '',
    description: '',
    price: '',
    creatorId: '',
    date: new Date(),
    downloadURL: ''
  };

  constructor(private firebaseService: FirebaseService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.loggedUserId = user?.uid
    });
  }

  async onSubmit() {
    this.newGame.creatorId = this.loggedUserId;
    if (this.newGame.name && this.newGame.type && this.newGame.image && this.newGame.description && this.newGame.creatorId && this.newGame.date && this.newGame.price && this.newGame.downloadURL) {
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
      price: '',
      creatorId: '',
      date: '',
      downloadURL: ''
    };
  }
}