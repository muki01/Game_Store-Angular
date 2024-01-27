import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service'
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any = {};
  purchasedGames: any = [];
  isYourProfile: boolean = false;

  isLoadingGames: boolean = true;
  isLoadingUserData: boolean = true;

  editProfileForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private firestoreService: FirestoreService, private route: ActivatedRoute) {
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.pattern]],
      title: ['', []],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const profileId = params.get('userId');
      if (profileId) {
        this.authService.loggedUser$.subscribe((user: any) => {
          const loggedUserId = user?.uid;
          if (loggedUserId) {
            this.isYourProfile = !!(profileId == loggedUserId);
          }
        });

        this.firestoreService.getUserById(profileId).then((userData: any) => {
          this.profileData = { id: profileId, ...userData };
          this.updateFormValues();
          this.isLoadingUserData = false
        });
        this.firestoreService.getPurchasedGames(profileId).then((games: any) => {
          this.purchasedGames = games;
          this.isLoadingGames = false;
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

      this.profileData.username = formData.username
      this.profileData.image = formData.image
      this.profileData.title = formData.title

      await this.firestoreService.updateUser(newProfileData, this.profileData.id);
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
