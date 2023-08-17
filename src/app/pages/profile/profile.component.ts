import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  editProfileForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private firebaseService: FirebaseService, private route: ActivatedRoute,) {
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.pattern]],
      title: ['', []],
    });
  }

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
          this.updateFormValues();
        });
        this.firebaseService.getPurchasedGames(this.profileId).subscribe((games: any) => {
          this.purchasedGames = games;
        });
      }
    });
  }

  updateFormValues() {
    this.editProfileForm.patchValue({
      username: this.profileData.username,
      image: this.profileData.image,
      title: this.profileData.title,
    });
  }

  async saveSettings() {
    const newProfileData: any = {
      username: '',
      image: '',
      title: ''
    };
    if (this.editProfileForm.valid) {
      const formData = this.editProfileForm.value;
      newProfileData.username = formData.username
      newProfileData.image = formData.image
      newProfileData.title = formData.title

      await this.firebaseService.updateUser(newProfileData, this.profileId);
    } else {
      this.showErrorMessage("Fill in the Data Correctly");
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
