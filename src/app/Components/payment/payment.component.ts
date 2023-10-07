import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService){}
  cartID: string | null = '';
  
  orderFrom: FormGroup = new FormGroup({
    details:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
  })
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
    this.cartID= params.get('id')
    }
  })
}
 
  handleForm(): void{
    this._CartService.chechOut(this.cartID, this.orderFrom.value).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          window.open(res.session.url,"_self")
        }
      }
    })
  }
}
