import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    Username: '',
    Password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Attempting login with:', this.loginData);
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);
        
        const token = res.token || res.Token;
        
        if (token) {
          this.authService.saveToken(token);
          console.log('Token saved successfully. Navigating to dashboard...');
          this.router.navigateByUrl('/dashboard').then(nav => {
            console.log('Navigation successful?', nav);
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        } else {
          console.error('No token found in response');
          alert('Login failed: Server did not return a token.');
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}