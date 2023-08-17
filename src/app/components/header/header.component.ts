import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedUserId: any;
  loggedUserData: any;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false

  constructor(private authService: AuthService, private firebaseService: FirebaseService,) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.loggedUserId = user?.uid
      if (user?.uid) {
        this.firebaseService.getUserById(user.uid).subscribe(userData => {
          this.loggedUserData = userData;
          if (this.loggedUserData.role == "admin")
            this.isAdmin = true
        });
      }
    });
  }

  signOut() {
    this.authService.signOut();
  }



  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (target.classList.contains('menuBtn')) {
      this.navToggle();
    }
  }
  navToggle() {
    const menuBtn = document.querySelector('.menuBtn');
    if (menuBtn) {
      menuBtn.classList.toggle('active');
    }

    const navBar = document.querySelector('.navBar') as HTMLElement;
    if (navBar) {
      navBar.classList.toggle('open');
      if (navBar.classList.contains('open')) {
        navBar.style.maxHeight = navBar.scrollHeight + 'px';
      } else {
        navBar.removeAttribute('style');
      }
    }
  }
}
