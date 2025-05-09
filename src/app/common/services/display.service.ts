import { effect, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DisplayService {
  
    readonly isDarkMode = signal<boolean>(false);
  private displayState ={theme:'dark'};
    constructor() {

      let ds = localStorage.getItem('displayState') ;
      if (ds) {
        this.displayState = JSON.parse(ds);
        if(this.displayState.theme=='dark') {
          this.isDarkMode.set(true);
        }else {
          this.isDarkMode.set(false);
        }
      }

        // Automatically apply class to <body> based on dark mode state
        effect(() => {
          if (this.isDarkMode()) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            this.displayState.theme='dark';
            localStorage.setItem('displayState', JSON.stringify(this.displayState));
            
          } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            this.displayState.theme='light';
            localStorage.setItem('displayState', JSON.stringify(this.displayState));
          }

          const theme = this.isDarkMode() ? 'dark' : 'light';
          document.body.setAttribute('data-bs-theme', theme);
          
        });
      }
    // Function to toggle dark/light mode
    toggleDarkMode(): void {
        this.isDarkMode.update(value => !value);
    }

}