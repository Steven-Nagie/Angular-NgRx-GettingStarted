import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  LoadProduts = '[Product] Load Products',
  LoadProductsSuccess = '[Product] Load Products Success',
  LoadProductsFailure = '[Product] Load Products Failure'
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;
  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProduts;
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductActionTypes.LoadProductsSuccess;
  constructor(payload: Product[]) {}
}

export class LoadProductsFailure implements Action {
  readonly type = ProductActionTypes.LoadProductsFailure;
  constructor(payload: string) {}
}

export type ProductActions = ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFailure;
