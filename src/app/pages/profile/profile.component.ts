import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileData: any | null = null;
  profileId: any | null = null;
  currentUserId: any | null = null;
  purchasedGames: any[] = [];
  notYourProfile: boolean = false

  constructor(private afAuth: AngularFireAuth, private firebaseService: FirebaseService, private route: ActivatedRoute,) {
    this.afAuth.authState.subscribe((user) => {
      this.currentUserId = user?.uid;
      this.route.paramMap.subscribe((params) => {
        this.profileId = params.get('userId');
        if (this.profileId) {
          if (this.profileId != this.currentUserId) {
            this.notYourProfile = true
          }
          this.firebaseService.getUserById(this.profileId).subscribe((userData: any) => {
            this.profileData = userData;
          });
          this.firebaseService.getPurchasedGames(this.profileId).subscribe((games: any) => {
            this.purchasedGames = games;
          });
        }
      });
    })
  }

  saveSettings() {
    this.firebaseService.updateUser(this.profileData, this.profileId)
  }
}
