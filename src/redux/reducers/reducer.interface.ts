import { IListApplication } from '../actions/action.interface';

export interface IAction {
  type: string;
  value: {
    loading: boolean;
    data: IListApplication;
    error: Error | null | unknown;
  };
}
