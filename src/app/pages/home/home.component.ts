import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorizedGames: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.fetchGames()
  }

  async fetchGames() {
    try {
      this.categorizedGames = await this.firestoreService.getGames();
    } catch (error) {
      console.error(error)
    }
  }

}
