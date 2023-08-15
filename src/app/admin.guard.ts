import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  currentUserData: any | null;
  currentUserId: any | null;
  constructor(private afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService,) {
    this.afAuth.authState.subscribe((user) => {
      this.currentUserId = user?.uid;
      this.firebaseService.getUserById(this.currentUserId).subscribe((userData: any) => {
        this.currentUserData = userData;
      });
    });
  }

  canActivate(): boolean {
    if (this.currentUserData.role == "admin") {
      return true;
    } else {
      // Admin değilse ana sayfaya yönlendir
      this.router.navigate(['/']);
      return false;
    }
  }
}
