import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupData = {
    Username: '',
    Password: '',
    Role: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.register(this.signupData).subscribe({
      next: (res: any) => {
        alert('Registration Success! Please login.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
