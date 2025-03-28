import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly authService= inject(AuthService);
  private readonly cartService = inject(CartService);
  isLogin = input<boolean>(true)
  countCart:number =0

  logOut():void{
    this.authService.logout();
  }
 
  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next : (value)=>{
        this.countCart = value
      }
    })
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.next(res.numOfCartItems)
      },
      error: (error) => {
        console.error(error);
      }
    })

  }
}
