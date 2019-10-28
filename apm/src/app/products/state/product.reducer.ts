import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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
export function reducer(state = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
