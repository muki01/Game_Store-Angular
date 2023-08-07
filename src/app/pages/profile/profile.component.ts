import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUserData: any | null = null;
  yourGames: any[] = [];

  constructor(private afAuth: AngularFireAuth, private firebaseService: FirebaseService, private route: ActivatedRoute,) {
    this.route.paramMap.subscribe((params) => {
      const userId: any = params.get('userId');
      console.log(userId)
      if (userId) {
        this.firebaseService.getUserById(userId).subscribe((userData: any) => {
          this.currentUserData = userData;
        });
        this.firebaseService.getYourGames(userId).subscribe((games: any) => {
          this.yourGames = games;
        });
      }
    });
  }
}
