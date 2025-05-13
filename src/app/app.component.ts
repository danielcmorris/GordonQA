import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GordonQA';
  isSidebarCollapsed = false;
  idToken: any = null;


  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.idTokenClaims$.subscribe(
      {
        next: (claims: any) => {
          this.idToken = claims?.__raw || null;  // __raw contains the actual JWT
          console.log('Raw ID Token:', this.idToken);
        },
        error: (err) => console.log('Error fetching ID Token:', err)
      });

   
  }


  logout() {

    this.auth.logout({ logoutParams: { returnTo: document.location.origin } })
  }
}
