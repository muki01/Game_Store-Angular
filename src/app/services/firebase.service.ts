import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  addGame(game: any) {
    try {
      this.firestore.collection('games').add(game);
      console.log('Game added successfully.');
      return true;
    } catch (error) {
      console.error('Error adding game:', error);
      return false;
    }
  }

  getGames(limit: number) {
    return this.firestore.collection('games', ref => ref.limit(limit).orderBy('date', 'desc')).snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const id = action.payload.doc.id;
            const data: any = action.payload.doc.data()
            return { id, ...data };
          });
        })
      );
  }

  getPopularGames(limit: number) {
    return this.firestore.collection('games', ref => ref.limit(limit).orderBy('date', 'asc')).snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const id = action.payload.doc.id;
            const data: any = action.payload.doc.data()
            return { id, ...data };
          });
        })
      );
  }

  getGamesByCategory(category: string, limit: number) {
    return this.firestore.collection('games', ref => ref.where('type', '==', category).orderBy('date', 'desc').limit(limit)).snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const id = action.payload.doc.id;
            const data: any = action.payload.doc.data()
            return { id, ...data };
          });
        })
      );
  }

  getGameById(gameId: string) {
    return this.firestore.collection('games').doc(gameId).valueChanges();
  }
  getUserById(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  updateGame(updatedGameData: any, gameId: any) {
    return this.firestore.collection('games').doc(gameId).update(updatedGameData);
  }

  deleteGame(gameId: string) {
    return this.firestore.collection('games').doc(gameId).delete();
  }

}