import { Injectable } from '@angular/core';
import { doc, Firestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  async getGames() {
    try {
      const gamesCollection = collection(this.firestore, 'games');
      const gamesQuery = query(gamesCollection, orderBy('date', 'desc'));
      const gamesSnapshot = await getDocs(gamesQuery);

      const gameDataArray = [];
      for (const gameDoc of gamesSnapshot.docs) {
        const gameData = { id: gameDoc.id, ...gameDoc.data() };
        gameDataArray.push(gameData);
      }

      return gameDataArray;
    } catch (error) {
      console.error("An error occurred while fetching games:", error);
      throw error;
    }
  }

  async getGamesByCategory(category: string) {
    try {
      const gamesCollection = collection(this.firestore, 'games');
      const queryCondition = query(gamesCollection, where('type', '==', category), orderBy('date', 'desc'))
      const gamesSnapshot = await getDocs(queryCondition);

      const gameDataArray: any = [];
      for (const gameDoc of gamesSnapshot.docs) {
        const gameData = { id: gameDoc.id, ...gameDoc.data() };
        gameDataArray.push(gameData);
      }
      return gameDataArray;
    } catch (error) {
      console.error("An error occurred while fetching games:", error);
    }
  }

  async getPopularGames(limit: number) {
    try {
      const gamesCollection = collection(this.firestore, 'games');
      const gamesQuery = query(gamesCollection, orderBy('likes', 'desc'));
      const gamesSnapshot = await getDocs(gamesQuery);

      const gameDataArray: any = [];
      const slicedGames = gamesSnapshot.docs.slice(0, limit);

      for (const gameDoc of slicedGames) {
        const gameData = { id: gameDoc.id, ...gameDoc.data() };
        gameDataArray.push(gameData);
      }

      return gameDataArray;

    } catch (error) {
      console.error('Error fetching popular games:', error);
    }
  }

  async getRandomGames(limit: number) {
    try {
      const gamesCollection = collection(this.firestore, 'games');
      const gamesSnapshot = await getDocs(gamesCollection);

      const allGames: any = []
      for (const gameDoc of gamesSnapshot.docs) {
        const games = { id: gameDoc.id, ...gameDoc.data() };
        allGames.push(games)
      };
      const shuffledArray = allGames.sort(() => Math.random() - 0.5);
      const randomGamesArray = shuffledArray.slice(0, limit);
      return randomGamesArray
    } catch (error) {
      console.error('Error fetching random games:', error);
    }
  }

  async getPurchasedGames(userId: string) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const purchasedGamesIds = userDoc.data()["purchasedGames"] || [];
        let purchasedGamesData: any = [];
        for (const gameId of purchasedGamesIds) {
          const gameRef = doc(this.firestore, 'games', gameId);
          const gameDoc = await getDoc(gameRef);
          if (gameDoc.exists()) {
            purchasedGamesData.push({ id: gameDoc.id, ...gameDoc.data() })
          }
        }

        return purchasedGamesData;
      } else {
        console.log('User not found');
        return null
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async getGameById(gameId: string) {
    try {
      const gameRef = doc(this.firestore, 'games', gameId);
      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        let gameData: any = { id: gameId, ...gameDoc.data() };
        return gameData
      } else {
        console.log('Game not found');
        return null
      }

    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  }

  async getUserById(userId: string) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData: any = { id: userId, ...userDoc.data() }
        return userData
      } else {
        console.log('User not found');
        return null
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async addGame(game: any) {
    try {
      const gamesRef = collection(this.firestore, 'games');
      await addDoc(gamesRef, game);
    } catch (error) {
      console.error('An error occurred during creating:', error);
    }
  }

  async updateGame(updatedGameData: any, gameId: any) {
    try {
      const gameRef = doc(this.firestore, 'games', gameId);
      await updateDoc(gameRef, updatedGameData);

      console.log('Game updated successfully');
    } catch (error) {
      console.error('Error updating game:', error);
    }
  }

  async updateUser(updatedUserData: any, userId: any) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await updateDoc(userRef, updatedUserData);

      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async updateBalance(userId: any, newBalance: any) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await updateDoc(userRef, { balance: newBalance });

      console.log('User balance updated successfully');
    } catch (error) {
      console.error('Error updating user balance:', error);
    }
  }

  async deleteGame(gameId: string) {
    try {
      const gameRef = doc(this.firestore, 'games', gameId);
      await deleteDoc(gameRef);
      console.log('Game deleted successfully');
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  }

  async addToPurchasedGames(userId: string, gameId: string) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        let purchasedGames = userData['purchasedGames'] || [];
        purchasedGames.push(gameId);
        await updateDoc(userRef, { purchasedGames });
      }
    } catch (error) {
      console.error('Error updating purchased games:', error);
    }
  }

  async searchGames(searchText: string) {
    try {
      const gamesCollection = collection(this.firestore, 'games');
      const queryCondition = query(gamesCollection, where('name', '>=', searchText), where('name', '<=', searchText + '\uf8ff'));
      const gamesSnapshot = await getDocs(queryCondition);

      const searchResultArray: any = [];
      for (const gameDoc of gamesSnapshot.docs) {
        const gameData = { id: gameDoc.id, ...gameDoc.data() };
        searchResultArray.push(gameData);
      }
      return searchResultArray
    } catch (error) {
      console.error('Error searching games:', error);
    }
  }
}