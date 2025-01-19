import { CanActivateChildFn } from '@angular/router';

import { CanActivateFn, Router } from '@angular/router';
import { RoleType } from '../../Models/user/user.model';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';

export const roleGuard: CanActivateChildFn = (childRoute, state) => {
  const requiredRoles = childRoute.data['roles'] as RoleType[];
  const authService = inject(AuthService)
  const globalService = inject(GlobalService)
  const router = inject(Router)
  if (authService.hasRole(requiredRoles)) {
    globalService.setIsAdmin(true)
    return true;
  }
  router.navigate(['/unauthorized']);
  return false;
};
