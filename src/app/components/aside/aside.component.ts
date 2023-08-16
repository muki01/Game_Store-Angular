import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  loggedUserData: any;
  searchText: string = '';
  searchedGames: any[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loggedUserData$.subscribe(userData => {
      this.loggedUserData = userData;
    });
  }
  @Input() popularGames: any[] = [];

  navigateToSearch() {
    const upperCaseSearchText = this.searchText.toUpperCase();
    this.router.navigate(['/search'], { queryParams: { q: upperCaseSearchText } });
  }
}
