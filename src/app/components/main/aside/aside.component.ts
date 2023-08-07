import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  currentUserData: any | null;
  currentUserId: any | null;

  constructor(private afAuth: AngularFireAuth, public authService: AuthService, private firebaseService: FirebaseService) {
    this.afAuth.authState.subscribe((user) => {
      this.currentUserId = user?.uid;
      this.firebaseService.getUserById(this.currentUserId).subscribe((userData: any) => {
        this.currentUserData = userData;
      });
    });
  }
  @Input() popularGames: any[] = [];
}
