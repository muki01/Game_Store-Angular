import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileData: any | null = null;
  profileId: any | null = null;
  loggedUserData: any | null = null;
  purchasedGames: any[] = [];
  notYourProfile: boolean = false;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private route: ActivatedRoute,) {
    this.authService.loggedUserData$.subscribe(userData => {
      this.loggedUserData = userData;
      this.handleProfileData();
    });

    this.route.paramMap.subscribe((params) => {
      this.profileId = params.get('userId');
      this.handleProfileData();
    });
  }

  handleProfileData() {
    if (this.profileId && this.loggedUserData) {
      if (this.profileId != this.loggedUserData.userId) {
        this.notYourProfile = true;
      }
      this.firebaseService.getUserById(this.profileId).subscribe((userData: any) => {
        this.profileData = userData;
      });
      this.firebaseService.getPurchasedGames(this.profileId).subscribe((games: any) => {
        this.purchasedGames = games;
      });
    }
  }

  saveSettings() {
    this.firebaseService.updateUser(this.profileData, this.profileId)
  }
}
