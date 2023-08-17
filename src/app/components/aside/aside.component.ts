import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  loggedUserData: any;
  loggedUserId: any;
  isLoggedIn: boolean = false;
  searchText: string = '';
  searchedGames: any[] = [];

  constructor(private authService: AuthService, private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.loggedUserId = user?.uid
      if (user?.uid) {
        this.firebaseService.getUserById(user.uid).subscribe(userData => {
          this.loggedUserData = userData;
        });
      }
    });
  }

  @Input() popularGames: any[] = [];

  navigateToSearch() {
    const upperCaseSearchText = this.searchText.toUpperCase();
    this.router.navigate(['/search'], { queryParams: { q: upperCaseSearchText } });
  }
}
