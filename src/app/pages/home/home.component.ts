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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, ButtonModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  hamada:string='';
  private readonly productsService= inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService= inject(CartService)
  private readonly toastrService= inject(ToastrService)


 
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }
  products:Iproduct[] = [];
  categories:ICategory[]= [];

  getProductsData():void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.products=res.data;
      },
      error: (err) => console.error(err)
    })
  }
 
  getCategoriesData():void {
    //show loading

    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data)
        this.categories=res.data;
        //hide loading

      },
      error: (err) => {
        console.error(err)
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
