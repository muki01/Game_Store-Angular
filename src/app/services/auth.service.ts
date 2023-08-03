import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any  | null = null;
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async signUp(email: string, password: string, username: string) {
    try {
      const authResult = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = authResult.user;
  
      if (user) {
        await user.updateProfile({ displayName: username });
        this.firestore.collection('users').doc(user.uid).set({
          username: username,
          email: email,
        });
      }
      console.log("Registration Succresfully Comppleted");
      this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.error('Kayıt sırasında bir hata oluştu:', error);
      return false;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const authResult = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log(authResult)
      console.log(await this.afAuth.currentUser)
      console.log("Login Succresfully Comppleted");
      this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu:', error);
      return false;
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      console.log(await this.afAuth.currentUser)
      console.log("LogOut Succresfully Comppleted");
      this.router.navigate(['/users/login']);
      return true;
    } catch (error) {
      console.error('Çıkış sırasında bir hata oluştu:', error);
      return false;
    }
  }
}
