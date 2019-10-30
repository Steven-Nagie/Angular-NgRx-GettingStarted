import { Action } from '@ngrx/store';
import { User } from '../user';

export enum UserActionTypes {
  ToggleMaskUserName = '[User] Toggle Mask User Name',
  SetCurrentUser = '[User] Set Current User'
}

export class ToggleMaskUserName implements Action {
  readonly type = UserActionTypes.ToggleMaskUserName;
  constructor(public payload: boolean) {}
}

export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SetCurrentUser;
  constructor(public payload: User) {}
}

export type UserActions = ToggleMaskUserName
  | SetCurrentUser;
