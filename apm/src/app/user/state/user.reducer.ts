import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.action';

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
export function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.ToggleMaskUserName:
      return {
        ...state,
        displayMaskUserName: action.payload
      };
    case UserActionTypes.SetCurrentUser:
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    default:
      return state;
  }
}
