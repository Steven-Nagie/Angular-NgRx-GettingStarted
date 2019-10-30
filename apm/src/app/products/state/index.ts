// Index.ts files for state should include: selectors and state interfaces, and other feature state for other modules

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { ProductState } from './product.reducer';
import { Product } from '../product';

export interface State extends fromRoot.State {
  products: ProductState;
}


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

export const getProducts = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.products
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getCurrentProductId,
  getProducts,
  (currentProductId: number, products: Product[]) => currentProductId !== 0 ? products.find(product => product.id === currentProductId) : {
    id: 0,
    productName: '',
    productCode: 'New',
    description: '',
    starRating: 0
  }
);

export const getError = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.error
);

