import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { nextTick } from 'process';
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute= inject(ActivatedRoute)
  private readonly ordersService =inject(OrdersService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)

  checkOutForm! :FormGroup;
  cartId:string='';

  initForm():void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, Validators.required]
    })
  }
  ngOnInit(): void {
    console.log("Checkout Page Loaded");
    this.initForm();
    this.getCartId()
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next: (param)=>{
        this.cartId=  param.get('id')!
      }
    })
  }
  submitForm():void{
    this.ordersService.checkOutPayment(this.cartId , this.checkOutForm.value ).subscribe({
      next: (res) => {
        console.log(res.session.url)
        if(res.status === "success"){
          open( res.session.url , '_self')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
