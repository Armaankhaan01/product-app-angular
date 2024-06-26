import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    RatingModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Input() header!: string;
  initialProduct: Product = {
    name: '',
    price: '',
    image: '',
    rating: 0,
  };
  @Input() product: Product = this.initialProduct;
  @Output() onConfirm = new EventEmitter<Product>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit(this.product);
    this.product = this.initialProduct;
  }

  cancel() {
    this.onCancel.emit();
  }
}
