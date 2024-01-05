import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  creatorData: any = {};
  constructor(private firestoreService: FirestoreService) { }
  @Input() game: any;

  ngOnInit(): void {
    this.firestoreService.getUserById(this.game.creatorId).then((creatorData: any) => {
      this.creatorData = creatorData
    });
  }
}
