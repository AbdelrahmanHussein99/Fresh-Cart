import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute){}
  cartID: string | null = '';
  
  orderFrom: FormGroup = new FormGroup({
    details:new FormControl(''),
    phone:new FormControl(''),
    city:new FormControl(''),
  })
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
    this.cartID= params.get('id')
    }
  })
}
 
  handleForm(): void{
    console.log(this.orderFrom.value);
    
  }
}
