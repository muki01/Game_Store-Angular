import { Component, Input } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  creatorData: any = {};
  constructor(private firebaseService: FirebaseService) { }
  @Input() game: any;

  ngOnInit(): void {
    this.firebaseService.getUserById(this.game.creatorId).subscribe((creatorData: any) => {
      this.creatorData = creatorData
    });
  }
}
