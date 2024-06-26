import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../types';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [ButtonModule, DialogModule, ProductComponent],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css',
})
export class DeletePopupComponent {
  @Input() display: boolean = false;
  @Input() product: Product = {
    id: 0,
    name: '',
    price: '',
    image: '',
    rating: 0,
  };
  @Output() onConfirm: EventEmitter<number> = new EventEmitter<number>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  confirm() {
    if (!this?.product?.id) return;
    this.onConfirm.emit(this.product.id);
  }

  cancel() {
    this.onCancel.emit();
  }
}
