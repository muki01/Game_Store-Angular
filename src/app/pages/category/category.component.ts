import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categort',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categorizedGames: any[] = [];
  isLoadingGames:boolean = true;

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const categoryName: any = params.get('categoryName');
      this.fetchGames(categoryName)
    })
  }

  async fetchGames(categoryName: string) {
    try {
      await this.firestoreService.getGamesByCategory(categoryName).then((games: any) => {
        this.categorizedGames = games;
        this.isLoadingGames = false;
      });
    } catch (error) {
      console.error(error)
    }
  }
}
