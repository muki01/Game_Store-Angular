import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  currentUser: any | null;
  currentUserName: any
  constructor(public authService: AuthService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  async loadCurrentUser() {
    this.currentUser = await this.authService.getCurrentUser();
    this.firebaseService.getUserById(this.currentUser.uid).subscribe((userData: any) => {
      this.currentUserName = userData.username;
    });
    console.log(this.currentUser)
  }
  @Input() popularGames: any[] = [];
}
