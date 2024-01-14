import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  gameData: any = {};

  editForm: FormGroup;
  errorMessage: string | null = null;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private firestoreService: FirestoreService) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      imageURL: ['', [Validators.required, Validators.pattern]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.nullValidator]],
      downloadURL: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const gameId = params.get('gameId');
      if (gameId) {
        this.firestoreService.getGameById(gameId).then((gameData: any) => {
          this.gameData = { id: gameId, ...gameData };
          if (gameData) {
            this.updateFormValues();
          } else {
            this.router.navigate(['404']);
          }
        });
      }
    });
  }
  updateFormValues() {
    this.editForm.patchValue({
      name: this.gameData.name,
      category: this.gameData.category,
      imageURL: this.gameData.image,
      description: this.gameData.description,
      price: this.gameData.price,
      downloadURL: this.gameData.downloadURL
    });
  }

  saveGame() {
    const newGameData: any = {
      name: '',
      category: '',
      image: '',
      description: '',
      price: '',
      downloadURL: ''
    };
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      newGameData.name = formData.name
      newGameData.category = formData.category
      newGameData.image = formData.imageURL
      newGameData.description = formData.description
      newGameData.price = formData.price
      newGameData.downloadURL = formData.downloadURL

      this.firestoreService.updateGame(newGameData, this.gameData.id)
      this.router.navigate(['/game', this.gameData.id]);
    } else {
      this.showErrorMessage("Fill in the Data Correctly");
    }
  }

  private showErrorMessage(message: string | null) {
    if (message !== null) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    }
  }
}