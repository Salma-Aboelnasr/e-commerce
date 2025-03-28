import { Component, inject, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [ SearchPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit  {
  private readonly productsService= inject(ProductsService);
  private readonly cartService= inject(CartService)
  private readonly toastrService= inject(ToastrService)
  hamada:string='';
  ngOnInit(): void {
    this.getProductsData();
  }
  products:Iproduct[] = [];

  getProductsData():void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.products=res.data;
      },
      error: (err) => console.error(err)
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
