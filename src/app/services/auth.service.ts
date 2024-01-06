import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, getDocs, setDoc, doc, query, collection, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>('');
  loggedUser$: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    authState(this.auth).subscribe(user => {
      this.loggedUser$.next(user);
    });
  }

  async signUp(email: string, password: string, username: string) {
    try {
      const userCollection = collection(this.firestore, 'users');
      const usernameQuerySnapshot = await getDocs(query(userCollection, where('username', '==', username)));
      const emailQuerySnapshot = await getDocs(query(userCollection, where('email', '==', email)));

      if (!usernameQuerySnapshot.empty) {
        console.log('This username is already in use.');
        this.errorMessage$.next('This username is already in use.');
        this.errorMessage$.next(null);
        return;
      }

      if (!emailQuerySnapshot.empty) {
        console.log('This email address is already in use.');
        this.errorMessage$.next('This email address is already in use.');
        this.errorMessage$.next(null);
        return;
      }

      const authResult = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = authResult.user;

      if (user) {
        const userData = {
          username: username,
          email: email,
          role: "user",
          balance: 200,
          purchasedGames: [],
          likedGames: [],
          image: "https://img.freepik.com/free-icon/user_318-159711.jpg",
          title: "",
        };

        const userRef = doc(this.firestore, 'users', user.uid);
        await setDoc(userRef, userData);
      }
      console.log("Registration Succresfully Comppleted");
      this.router.navigate(['/']);
      return;
    } catch (error: any) {
      console.error('An error occurred during registration:', error);
      this.errorMessage$.next('An error occurred during registration.');
      this.errorMessage$.next(null)
      return;
    }
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      console.log("Login Succresfully Comppleted");
      this.router.navigate(['/']);
      return;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log('User not found. Please check your email.');
        this.errorMessage$.next('User not found. Please check your email.');
        this.errorMessage$.next(null)
      } else if (error.code === 'auth/wrong-password') {
        console.log('Incorrect password. Please check your password.');
        this.errorMessage$.next('Incorrect password. Please check your password.');
        this.errorMessage$.next(null)
      } else {
        console.error('An error occurred during login.', error);
        this.errorMessage$.next('An error occurred during login.');
        this.errorMessage$.next(null)
      }
      return;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      console.log("Logout Succresfully Comppleted");
      this.router.navigate(['/users/login']);
      return;
    } catch (error: any) {
      console.error('An error occurred while Logout:', error);
      return;
    }
  }

}
