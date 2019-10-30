import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as productActions from './product.actions';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  // Pushing one action into the stream, and transforming it into a different action with the products payload
  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
      map((products: Product[]) => new productActions.LoadSuccess(products)),
      catchError(err => of(new productActions.LoadFailure(err)))
    ))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) => this.productService.updateProduct(product).pipe(
        map((response: Product) => new productActions.UpdateProductSuccess(response)),
        catchError(err => of(new productActions.UpdateProductFailure(err)))
      )
    )
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) => this.productService.createProduct(product).pipe(
      map((response: Product) => new productActions.CreateProductSuccess(response)),
      catchError(err => of(new productActions.CreateProductFailure(err)))
    ))
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) => this.productService.deleteProduct(productId).pipe(
      map(() => new productActions.DeleteProductSuccess(productId)),
      catchError(err => of(new productActions.DeleteProductSuccess(err)))
    ))
  );
}
