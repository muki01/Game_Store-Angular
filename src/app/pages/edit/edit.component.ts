import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  gameData: any = {};
  gameId: any;

  constructor(private route: ActivatedRoute, private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe((gameData: any) => {
          this.gameData = gameData;
        });
      }
    });
  }

  saveGame() {
    this.firebaseService.updateGame(this.gameData, this.gameId).then(() => {
      this.router.navigate(['/game', this.gameId]);
    });
  }
}