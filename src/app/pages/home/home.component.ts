import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorizedGames: any[] = [];
  isLoadingGames:boolean = true;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.fetchGames()
  }

  async fetchGames() {
    try {
      await this.firestoreService.getGames().then((games: any) => {
        this.categorizedGames = games;
        this.isLoadingGames = false;
      });
    } catch (error) {
      console.error(error)
    }
  }

}
