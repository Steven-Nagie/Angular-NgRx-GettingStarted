import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { select, Store } from '@ngrx/store';
import * as fromProduct from '../state';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  componentActive = true;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromProduct.State>
  ) { }

  ngOnInit(): void {
    this.store.pipe(
      select(fromProduct.getShowProductCode),
      takeWhile(() => this.componentActive),
    ).subscribe(
      showProductCode => this.displayCode = showProductCode
    );

    // Error handling is no longer the responsibility of the observable here on the component, which is a different paradigm than we currently use
    // We'll have to modify our angular two notifications - perhaps just add a subscription here and if anything passes through then launch the error
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.pipe(
      select(fromProduct.getCurrentProduct),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    // Dispatch Load action to trigger effect
    this.store.dispatch(new productActions.Load());

    // Subscribe to products property of product state
    // By setting the products$ variable to the observable and using the async pipe, angular unsubscribes for us
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product.id));
  }

}
