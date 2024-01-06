import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  popularGames:any = [];
  loggedUserData: any = {};
  searchText: string = '';
  searchedGames: any = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.fetchUserData()
    this.fetchPopularGames()
  }

  navigateToSearch() {
    const upperCaseSearchText = this.searchText.toUpperCase();
    this.router.navigate(['/search'], { queryParams: { q: upperCaseSearchText } });
  }

  async fetchPopularGames() {
    try {
      this.popularGames = await this.firestoreService.getPopularGames(3);
    } catch (error) {
      console.error(error)
    }
  }

  async fetchUserData() {
    try {
      this.authService.loggedUser$.subscribe(user => {
        this.isLoggedIn = !!user;
        const loggedUserId = user?.uid
        if (loggedUserId) {
          this.firestoreService.getUserById(loggedUserId).then((userData) => {
            this.loggedUserData = {id:loggedUserId, ...userData};
          })
        }
      });
    } catch (error) {
      console.error(error)
    }
  }
}
