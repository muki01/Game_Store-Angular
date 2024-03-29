import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedUserData: any = {};
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isCreator: boolean = false;

  constructor(private authService: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      const loggedUserId = user?.uid
      if (loggedUserId) {
        this.isLoggedIn = !!user;
        this.firestoreService.getUserById(loggedUserId).then(userData => {
          this.loggedUserData = { id: loggedUserId, ...userData };
          if (this.loggedUserData.role == "admin"){
            this.isAdmin = true
          }else if(this.loggedUserData.role == "creator"){
            this.isCreator = true
          }
        });
      }
    });
  }

  signOut() {
    this.authService.signOut();
    this.isLoggedIn = false
    this.isAdmin = false
    this.isCreator = false
  }

  navToggle() {
    const navBar = document.querySelector('.navBar') as HTMLElement;
    const menuBtn = document.querySelector('.menuBtn') as HTMLElement;
    menuBtn.classList.toggle('openmenu');
    navBar.classList.toggle('open');
    if (navBar.classList.contains('open')) {
      navBar.style.maxHeight = navBar.scrollHeight + 'px';
    } else {
      navBar.removeAttribute('style');
    }
  }

  navCloser() {
    const navBar = document.querySelector('.navBar') as HTMLElement;
    const menuBtn = document.querySelector('.menuBtn') as HTMLElement;
    menuBtn.classList.remove('openmenu');
    navBar.classList.remove('open');
    navBar.removeAttribute('style');
  }
}
