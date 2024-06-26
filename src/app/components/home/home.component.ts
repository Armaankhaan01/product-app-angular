import { Component, ViewChild, viewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products, Product } from '../../types';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
    DeletePopupComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService
  ) {}
  @ViewChild('paginator') paginator!: Paginator;
  products: Product[] = [];
  loading: boolean = false;
  onEditProduct(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  onDeleteProduct(product: Product) {
    this.selectedProduct = product;
    this.displayDeletePopup = true;
  }
  showError(error: Error) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    });
  }
  totalRecords: number = 0;
  rows: number = 5;
  selectedProduct: Product = {
    id: 0,
    price: '',
    name: '',
    image: '',
    rating: 0,
  };

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;
  displayDeletePopup: boolean = false;
  onConfirmEdit(product: Product): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.editProduct(product, this.selectedProduct.id);
      this.displayEditPopup = false;
    }
  }

  onConfirmAdd(product: Product): void {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onConfirmDelete(id: number): void {
    this.deleteProduct(id);
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0); // reset page = 0;
  }

  fetchProducts(page: number, perPage: number) {
    this.loading = true;
    this.productsService
      .getProducts('clothes', {
        page: page,
        perPage: perPage,
      })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
          this.loading = false; // Stop the loader
        },

        error: (error) => {
          console.log(error, 'Error Fetch');
          this.showError(error);
          this.loading = false; // Stop the loader on error
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService.editProduct('clothes/' + id, product).subscribe({
      next: (data) => {
        console.log(data, 'Edit');
        this.resetPaginator();
      },

      error: (error) => console.log(error, 'Error Edit'),
    });
  }

  deleteProduct(id: number) {
    if (!id) {
      return;
    }
    this.productsService.deleteProduct('clothes/' + id).subscribe({
      next: (data) => {
        console.log(data, 'Delete');
        this.resetPaginator();
      },
      error: (error) => console.log(error, 'Error Delete'),
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct('clothes', product).subscribe({
      next: (data) => {
        console.log(data, 'Add');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: data.name + ' added successfully',
        });
        this.resetPaginator();
      },
      error: (error) => console.log(error, 'Error Add'),
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
