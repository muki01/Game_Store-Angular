import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  getGames() {
    try {
      return this.firestore.collection('games', ref => ref.orderBy('date', 'desc')).snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data: any = action.payload.doc.data()
          return { id, ...data };
        });
      }));
    } catch (error) {
      console.error("An error occurred while fetching games:", error);
      throw error;
    }
  }

  getGamesByCategory(category: string) {
    try {
      return this.firestore.collection('games', ref => ref.where('type', '==', category).orderBy('date', 'desc')).snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data: any = action.payload.doc.data()
          return { id, ...data };
        });
      }));
    } catch (error) {
      console.error("An error occurred while fetching games by category:", error);
      throw error;
    }
  }

  getPopularGames(limit: number) {
    try {
      return this.firestore.collection('games', ref => ref.limit(limit).orderBy('date', 'asc')).snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data: any = action.payload.doc.data()
          return { id, ...data };
        });
      }));
    } catch (error) {
      console.error("An error occurred while fetching popular games:", error);
      throw error;
    }
  }

  getRandomGames(limit: number) {
    try {
      return this.firestore.collection('games').get().pipe(map(querySnapshot => {
        const games: any = [];
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const data: any = doc.data();
          games.push({ id, ...data });
        });

        const shuffledGames = games.sort(() => 0.5 - Math.random());
        return shuffledGames.slice(0, limit);
      }));
    } catch (error) {
      console.error("An error occurred while fetching random games:", error);
      throw error;
    }
  }

  getPurchasedGames(userId: string) {
    try {
      return this.firestore.collection('users').doc(userId).valueChanges().pipe(switchMap((user: any) => {
        const gameIds = user.purchasedGames || [];
        const gameObservables = gameIds.map((gameId: string) =>
          this.firestore.collection('games').doc(gameId).valueChanges().pipe(
            map((game: any) => ({ id: gameId, ...game }))
          )
        );
        return combineLatest(gameObservables);
      }));
    } catch (error) {
      console.error("An error occurred while fetching purchased games:", error);
      throw error;
    }
  }

  getGameById(gameId: string) {
    try {
      return this.firestore.collection('games').doc(gameId).valueChanges();
    } catch (error) {
      console.error("An error occurred while fetching game by ID:", error);
      throw error;
    }
  }
  getUserById(userId: string) {
    try {
      return this.firestore.collection('users').doc(userId).valueChanges();
    } catch (error) {
      console.error("An error occurred while fetching user by ID:", error);
      throw error;
    }
  }

  async addGame(game: any) {
    try {
      await this.firestore.collection('games').add(game);
      console.log('Game added successfully.');
    } catch (error) {
      console.error('Error adding game:', error);
    }
  }

  async updateGame(updatedGameData: any, gameId: any) {
    try {
      await this.firestore.collection('games').doc(gameId).update(updatedGameData);
      console.log('Game updated successfully.');
    } catch (error) {
      console.error('Error updating Game:', error);
    }
  }

  async updateUser(updatedUserData: any, userId: any) {
    try {
      await this.firestore.collection('users').doc(userId).update(updatedUserData);
      console.log('User updated successfully.');
    } catch (error) {
      console.error('Error updating User:', error);
    }
  }

  async updateBalance(userId: any, newBalance: any) {
    try {
      await this.firestore.collection('users').doc(userId).update({ balance: newBalance });
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

  async addToPurchasedGames(userId: string, gameId: string) {
    try {
      await this.firestore.collection('users').doc(userId).update({
        purchasedGames: firebase.firestore.FieldValue.arrayUnion(gameId)
      });
      console.log('Game added to Purchased Games successfully.');
    } catch (error) {
      console.error('Error adding game to Purchased Games:', error);
    }
  }

  searchGames(searchText: string) {
    return this.firestore.collection('games', ref => ref.where('name', '>=', searchText).where('name', '<=', searchText + '\uf8ff')).snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const id = action.payload.doc.id;
        const data: any = action.payload.doc.data();
        return { id, ...data };
      });
    })
    );
  }
}