import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent {
  loggedUserId: any

  createForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService, private router: Router, private authService: AuthService) {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
      imageURL: ['', [Validators.required, Validators.pattern]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.nullValidator]],
      downloadURL: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.loggedUserId = user?.uid
    });
  }

  async createGame() {
    const newGame: any = {
      name: '',
      type: '',
      image: '',
      description: '',
      price: '',
      creatorId: '',
      date: '',
      downloadURL: ''
    };
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      newGame.name = formData.name
      newGame.type = formData.type
      newGame.image = formData.imageURL
      newGame.description = formData.description
      newGame.price = formData.price
      newGame.creatorId = this.loggedUserId
      newGame.date = new Date()
      newGame.downloadURL = formData.downloadURL

      await this.firebaseService.addGame(newGame);
      this.router.navigate(['/']);
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