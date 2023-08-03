import { Component,HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  constructor(public authService: AuthService) {}

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
  
  
  signOut() {
    this.authService.signOut();
  }
}
