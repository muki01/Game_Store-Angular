import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedGames: any[] = [];

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchText = params['q'];
      if (searchText) {
        this.firestoreService.searchGames(searchText).then((games: any[]) => {
          this.searchedGames = games;
        });
      }
    });
  }
}
