import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  isLoading:boolean = false

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.errorMessage$.subscribe((errorMessage) => {
      this.showErrorMessage(errorMessage);
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      if (formData.password === formData.repassword) {
        this.isLoading = true
        this.authService.signUp(formData.email, formData.password, formData.username);
      } else {
        this.showErrorMessage("Passwords do not match.");
      }
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
