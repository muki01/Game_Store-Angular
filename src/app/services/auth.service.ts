import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any | null = null;
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async signUp(email: string, password: string, username: string) {
    try {
      const usernameQuerySnapshot: any = await this.firestore.collection('users', ref => ref.where('username', '==', username)).get().toPromise();
      const emailQuerySnapshot: any = await this.firestore.collection('users', ref => ref.where('email', '==', email)).get().toPromise();

      if (!usernameQuerySnapshot.empty) {
        console.error('Bu kullanıcı adı zaten kullanılıyor.');
        return false;
      }

      if (!emailQuerySnapshot.empty) {
        console.error('Bu e-posta adresi zaten kullanılıyor.');
        return false;
      }

      const authResult = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = authResult.user;

      if (user) {
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
      await this.afAuth.signInWithEmailAndPassword(email, password);
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
      console.log("LogOut Succresfully Comppleted");
      this.router.navigate(['/users/login']);
      return true;
    } catch (error) {
      console.error('Çıkış sırasında bir hata oluştu:', error);
      return false;
    }
  }

  getCurrentUserId(): string | null {
    if (this.user) {
      return this.user.uid;
    } else {
      return null;
    }
  }

  async getCurrentUser(): Promise<any> {
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe((user) => {
        resolve(user);
      });
    });
  }

}
