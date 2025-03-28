import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { platformBrowser } from '@angular/platform-browser';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if ( isPlatformBrowser(platformId) ) {
    if(localStorage.getItem('token') ){
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist') ) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('token')!
        }
      });
    }
  }
  }

  return next(req);
}; 

