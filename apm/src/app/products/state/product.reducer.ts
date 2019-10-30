import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};


/**
 * ========================================================
 *                        SELECTORS
 * =========================================================
 */
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.products
);

/**
 * ========================================================
 *                        REDUCER
 * =========================================================
 */
export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: null,
          productName: 'New',
          productCode: '',
          description: 'New',
          starRating: 0
        }
      };
    default:
      return state;
  }
}
