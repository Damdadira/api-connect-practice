import { useEffect, useReducer } from 'react';
import axios from 'axios';

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

function reducer(state: State, action: Action) {
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

export default function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
        // 'https://jsonplaceholder.typicode.com/users2' //주소를 다르게 바꾸면 404 에러 발생
      );
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch({ type: 'ERROR', error: e.message });
      } else {
        dispatch({ type: 'ERROR', error: 'Unkown error' });
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error occurred: {error}</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username})
          </li>
        ))}
      </ul>
      <button
        style={{ margin: '24px', background: '#999', color: '#fff' }}
        onClick={fetchUsers}
      >
        다시 불러오기
      </button>
    </>
  );
}
