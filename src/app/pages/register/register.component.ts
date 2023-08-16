import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  repassword = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.password === this.repassword) {
      this.authService.signUp(this.email, this.password, this.username);
    } else {
      console.error('Passwords do not match.');
    }
  }
}
