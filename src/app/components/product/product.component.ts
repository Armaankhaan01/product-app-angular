import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() displayDeletePopup: boolean = false;
  @Output() onEdit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() onDelete: EventEmitter<Product> = new EventEmitter<Product>();
  edit() {
    this.onEdit.emit(this.product);
  }
  delete() {
    if (!this.product.id) return;
    this.onDelete.emit(this.product);
  }
}
