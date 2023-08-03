import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  addGame(gameData: any) {
    return this.firestore.collection('games').add(gameData);
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

  getById(gameId: string) {
    return this.firestore.collection('games').doc(gameId).valueChanges();
  }
}