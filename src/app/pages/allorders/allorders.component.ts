import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartItem, IOrder } from '../../shared/interfaces/i-order';
import { Modal } from 'flowbite';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit, AfterViewInit{
  private readonly authService = inject(AuthService)
  private readonly ordersService = inject(OrdersService)


   cartItems:CartItem[] = []
   showModal:boolean = false

//   @ViewChild('items') items:ElementRef = new ElementRef('')

//   modalOptions:any = {
//     placement: 'bottom-right',
//     backdrop: 'dynamic',
//     backdropClasses:
//         'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
//     closable: true,
//     onHide: () => {
//         console.log('modal is hidden');
//     },
//     onShow: () => {
//         console.log('modal is shown');
//     },
//     onToggle: () => {
//         console.log('modal has been toggled');
//     },
// };

// instance options object
//  instanceOptions= {
//   id: 'default-modal',
//   override: true
// };

openModal(index:number):void{
  // let el= this.items.nativeElement as HTMLElement;
  // const modal= new Modal(el, this.modalOptions, this.instanceOptions);
  // modal.show();
  this.cartItems = this.allOrders[index].cartItems;
  this.showModal = true;
}
  
  allOrders:IOrder [] = []
  ngOnInit(): void {
    this.getUserId()
  }

  getUserId(){
    this.authService.getUserData(); // Decode the token
    const userId = this.authService.getUserId(); // Get user ID
  
    if (userId) {
      this.getAllOrders(userId);
      console.log(userId)
    }
  
  }

  getAllOrders(id:string):void{
    this.ordersService.getUserOrders(id).subscribe({
      next: (res)=>{
        console.log(res)
        this.allOrders = res
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  ngAfterViewInit(): void {
    // console.log(this.items)
  }
}
