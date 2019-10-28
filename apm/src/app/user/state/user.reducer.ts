import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
  displayMaskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  displayMaskUserName: false,
  currentUser: null
};

/**
 * ========================================================
 *                        SELECTORS
 * =========================================================
 */

const getUserFeatureState = createFeatureSelector('users');

export const getDisplayMaskUserName = createSelector(
  getUserFeatureState,
  (state: UserState) => state.displayMaskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state: UserState) => state.currentUser
)

/**
 * ========================================================
 *                        REDUCER
 * =========================================================
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MASK_USER_NAME':
      return {
        ...state,
        displayMaskUserName: action.payload
      };
    default:
      return state;
  }
}
