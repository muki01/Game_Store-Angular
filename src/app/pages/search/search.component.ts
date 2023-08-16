import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedGames: any[] = [];
  popularGames: any[] = [];

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchText = params['q'];
      if (searchText) {
        this.firebaseService.searchGames(searchText).subscribe((games: any[]) => {
          this.searchedGames = games;
        });
      }
    });
    this.firebaseService.getPopularGames(3).subscribe((games: any[]) => {
      this.popularGames = games;
    });
  }
}
