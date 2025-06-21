import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToFilmes(): void {
    this.router.navigate(['/filmes']);
  }

  goToAssistidos(): void {
    this.router.navigate(['/assistidos']);
  }

  goToAvaliados(): void {
    this.router.navigate(['/avaliados']);
  }

  goToAssistir(): void {
    this.router.navigate(['/assistir']);
  }
}
