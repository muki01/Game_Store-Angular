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
  profileData: any;
  profileId: any;
  loggedUserData: any;
  loggedUserId: any;
  purchasedGames: any[] = [];
  isYourProfile: boolean = false;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.profileId = params.get('userId');
      if (this.profileId) {
        this.authService.loggedUser$.subscribe(user => {
          this.loggedUserId = user?.uid;
          if (this.loggedUserId) {
            this.isYourProfile = !!(this.profileId == this.loggedUserId);
          }
        });

        this.firebaseService.getUserById(this.profileId).subscribe((userData: any) => {
          this.profileData = userData;
        });
        this.firebaseService.getPurchasedGames(this.profileId).subscribe((games: any) => {
          this.purchasedGames = games;
        });
      }
    });
  }

  saveSettings() {
    this.firebaseService.updateUser(this.profileData, this.profileId)
  }
}
