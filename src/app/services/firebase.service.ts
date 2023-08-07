import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  async addGame(game: any) {
    try {
      await this.firestore.collection('games').add(game);
      console.log('Game added successfully.');
      return true;
    } catch (error) {
      console.error('Error adding game:', error);
      return false;
    }
  }

  getGames(limit: number) {
    return this.firestore.collection('games', ref => ref.limit(limit).orderBy('date', 'desc')).snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const id = action.payload.doc.id;
        const data: any = action.payload.doc.data()
        return { id, ...data };
      });
    })
    );
  }

  getPopularGames(limit: number) {
    return this.firestore.collection('games', ref => ref.limit(limit).orderBy('date', 'asc')).snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const id = action.payload.doc.id;
        const data: any = action.payload.doc.data()
        return { id, ...data };
      });
    })
    );
  }

  getGamesByCategory(category: string, limit: number) {
    return this.firestore.collection('games', ref => ref.where('type', '==', category).orderBy('date', 'desc').limit(limit)).snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const id = action.payload.doc.id;
        const data: any = action.payload.doc.data()
        return { id, ...data };
      });
    })
    );
  }

  getYourGames(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges().pipe(
      switchMap((user: any) => {
        const gameIds = user.yourgames || []; // Kullanıcının sahip olduğu oyun ID'leri

        // gameIds dizisindeki her ID için bir observable oluşturup birleştiriyoruz
        const gameObservables = gameIds.map((gameId: string) =>
          this.firestore.collection('games').doc(gameId).valueChanges().pipe(
            map((game: any) => ({ id: gameId, ...game })) // ID'yi ekleyerek oyun bilgilerini dönüyoruz
          )
        );

        // Tüm oyun observable'larını bir araya getiriyoruz
        return combineLatest(gameObservables);
      })
    );
  }

  getGameById(gameId: string) {
    return this.firestore.collection('games').doc(gameId).valueChanges();
  }
  getUserById(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  async updateGame(updatedGameData: any, gameId: any) {
    try {
      await this.firestore.collection('games').doc(gameId).update(updatedGameData);
      console.log('Game updated successfully.');
    } catch (error) {
      console.error('Error updating Game:', error);
    }
  }

  async updateBalance(newBalance: any) {
    try {
      await this.firestore.collection('users').doc(this.authService.currentUserId).update({ balance: newBalance });
      console.log('Balance updated successfully.');
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  }

  async deleteGame(gameId: string) {
    try {
      await this.firestore.collection('games').doc(gameId).delete();
      console.log('Game deleted successfully.');
    }
    catch (error) {
      console.error('Error delete game on games:', error);
    }
  }

  async addToYourGames(userId: string, gameId: string) {
    try {
      await this.firestore.collection('users').doc(userId).update({
        yourgames: firebase.firestore.FieldValue.arrayUnion(gameId)
      });
      console.log('Game added to your games successfully.');
    } catch (error) {
      console.error('Error adding game to your games:', error);
    }
  }
}