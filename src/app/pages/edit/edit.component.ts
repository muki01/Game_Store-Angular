import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  gameData: any = {};
  gameId: any;

  editForm: FormGroup;
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private firebaseService: FirebaseService) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
      imageURL: ['', [Validators.required, Validators.pattern]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.nullValidator]],
      downloadURL: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe((gameData: any) => {
          this.gameData = gameData;
          this.updateFormValues();
        });
      }
    });
  }
  updateFormValues() {
    this.editForm.patchValue({
      name: this.gameData.name,
      type: this.gameData.type,
      imageURL: this.gameData.image,
      description: this.gameData.description,
      price: this.gameData.price,
      downloadURL: this.gameData.downloadURL
    });
  }

  saveGame() {
    const newGameData: any = {
      name: '',
      type: '',
      image: '',
      description: '',
      price: '',
      downloadURL: ''
    };
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      newGameData.name = formData.name
      newGameData.type = formData.type
      newGameData.image = formData.imageURL
      newGameData.description = formData.description
      newGameData.price = formData.price
      newGameData.downloadURL = formData.downloadURL

      this.firebaseService.updateGame(newGameData, this.gameId)
      this.router.navigate(['/game', this.gameId]);
    } else {
      this.errorMessage = "Fill in the Data Correctly"
    }
  }
}