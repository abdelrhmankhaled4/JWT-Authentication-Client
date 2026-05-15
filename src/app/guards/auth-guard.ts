import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');


  if (token && token !== 'undefined' && token !== 'null') {
    return true;
  }

  console.warn('AuthGuard: No valid token found, redirecting to login.');
  router.navigate(['/']);
  return false;
};