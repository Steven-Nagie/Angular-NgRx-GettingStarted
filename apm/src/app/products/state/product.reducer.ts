import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
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
    case ProductActionTypes.SetCurrentProductId:
      return {
        ...state,
        currentProductId: action.payload
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFailure:
      return {
        ...state,
        error: action.payload
      };
    case ProductActionTypes.UpdateProductSuccess:
      // Always create new state, never modify old state -> that's why we create a new array with map
      const updatedProducts: Product[] = state.products.map(
        product => action.payload.id === product.id ? action.payload : product
      );
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.CreateProductSuccess:
      // Always create new state, never modify old state -> that's why we create a new array with map
      const newProducts: Product[] = state.products.concat(action.payload);
      return {
        ...state,
        products: newProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.DeleteProductSuccess:
      // Always create new state, never modify old state -> that's why we create a new array with map
      const productsWithoutDeleted: Product[] = state.products.filter(product => product.id !== action.payload);
      return {
        ...state,
        products: productsWithoutDeleted,
        currentProductId: action.payload,
        error: ''
      };
    case ProductActionTypes.CreateProductFailure:
    case ProductActionTypes.UpdateProductFailure:
    case ProductActionTypes.DeleteProductFailure:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
