import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,SweetAlert2Module,RouterLink],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService);
  cartDetails: ICart = {} as ICart
  ngOnInit(): void {
    this.getCartData()
  }
  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);// total cart price , products[{}]
        this.cartDetails = res.data;
      },
      error: (error) => {
        console.error('Error retrieving cart data:', error);
      }
    })
  }


  // removeItem(id:string):void{
  //   this.cartService.removeSpecificCartItem(id).subscribe({
  //     next: (res)=>{
  //       console.log(res);
  //       // this.getCartData();
  //       this.cartDetails = res.data;
  //     },
  //     error: (error) => {
  //       console.error( error);
  //     }
  //   })
  // }
  removeItem(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
            this.cartService.cartNumber.next(res.numOfCartItems);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    });
  }

  updateCount(id:string, newCount: number): void {
    this.cartService.updateProductQuantity(id ,newCount).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  clearCart():void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to clear your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res)=>{
            console.log(res);
            if(res.message === 'success'){
              this.cartDetails ={} as ICart;
              this.cartService.cartNumber.next(0);
            }
          },
          error: (error) => {
            console.error( error);
          }
        })
      }
    });
  }
}
