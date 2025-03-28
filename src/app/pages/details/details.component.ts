import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService= inject(ProductsService);
  private readonly cartService= inject(CartService);
  private readonly toastrService= inject(ToastrService);


  productId:any;
  productDetails: Iproduct = {} as Iproduct;
  selectedImage: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        console.log(res.get("id"));
        this.productId = res.get("id");

        this.productsService.getSpecificProduct(this.productId).subscribe({
          next: (res) => {
            this.productDetails = res.data;
            console.log(res.data);
          },
          error: (error) => {
            console.error(error);
          }
        })
      },
      error: (error) => {
        console.error( error);
      }
    })
  }
  addToCart(id:string):void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        if(res.status === 'success') {
        this.toastrService.success(res.message , 'Fresh Cart');
        this.cartService.cartNumber.next(res.numOfCartItems)
        console.log(this.cartService.cartNumber.getValue());
        }
      },
      error: (err) => {
        console.error(err)
      }
    }
    )
  }
}
