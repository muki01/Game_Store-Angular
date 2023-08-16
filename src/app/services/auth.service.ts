import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser$: BehaviorSubject<any | null> = new BehaviorSubject(null);
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this.loggedUser$.next(user);
    });
  }

  async signUp(email: string, password: string, username: string) {
    try {
      const usernameQuerySnapshot: any = await this.firestore.collection('users', ref => ref.where('username', '==', username)).get().toPromise();
      const emailQuerySnapshot: any = await this.firestore.collection('users', ref => ref.where('email', '==', email)).get().toPromise();

      if (!usernameQuerySnapshot.empty) {
        console.error('This username is already in use.');
        return false;
      }

      if (!emailQuerySnapshot.empty) {
        console.error('This email address is already in use.');
        return false;
      }

      const authResult = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = authResult.user;

      if (user) {
        this.firestore.collection('users').doc(user.uid).set({
          username: username,
          email: email,
          role: "user",
          balance: 200,
          purchasedGames: [],
          image: "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000",
          title: "",
        });
      }
      console.log("Registration Succresfully Comppleted");
      this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.error('An error occurred during registration:', error);
      return false;
    }
  }

  async signIn(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log("Login Succresfully Comppleted");
      this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.error('An error occurred during login:', error);
      return false;
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      console.log("Logout Succresfully Comppleted");
      this.router.navigate(['/users/login']);
      return true;
    } catch (error) {
      console.error('An error occurred while Logout:', error);
      return false;
    }
  }

}
