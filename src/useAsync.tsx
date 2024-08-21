import { useEffect, useReducer } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
}

interface State {
  loading: boolean;
  data?: User[] | null;
  error?: string | null;
}

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; data: User[] }
  | { type: 'ERROR'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

type CallbackFunction = () => Promise<User[]>;

export default function useAsync(
  callback: CallbackFunction,
  deps: any[] = [],
  skip: boolean
): [State, () => void] {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: (e as Error).message });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

  return [state, fetchData];
}
