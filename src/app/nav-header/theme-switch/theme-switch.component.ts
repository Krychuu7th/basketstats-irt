import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss'
})
export class ThemeSwitchComponent {

  themeMode: 'day' | 'night' = 'day';

  icon: 'pi-sun' | 'pi-moon' = 'pi-sun';


  switchTheme(): void {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;

    switch (this.themeMode) {
      case 'day': {
        this.themeMode = 'night';
        this.icon = 'pi-moon';
        themeLink.href = "night-theme.css";
        break;
      }
      case 'night': {
        this.themeMode = 'day';
        this.icon = 'pi-sun';
        themeLink.href = "day-theme.css";
        break;
      }
    }
    document.body.setAttribute(
      'theme-mode',
      this.themeMode
    );
  }
}
