import { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';
import { PiAcornLight, PiAndroidLogoLight } from 'react-icons/pi';

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

async function getUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState<number | null>(null);
  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users)
    return (
      <button
        style={{ margin: '24px', background: 'orange', color: 'white' }}
        onClick={refetch}
      >
        불러오기
      </button>
    );

  return (
    <>
      <ul style={{ paddingLeft: '24px' }}>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{
              cursor: 'pointer',
              listStyle: 'none',
              padding: '4px',
              color: 'olivedrab',
            }}
          >
            <PiAcornLight style={{ marginRight: '12px' }}></PiAcornLight>
            {user.username} <b>({user.name})</b>
          </li>
        ))}
      </ul>
      <button
        style={{ margin: '24px', background: 'darkolivegreen', color: 'white' }}
        onClick={refetch}
      >
        다시 불러오기
      </button>
      <hr style={{ border: 0, borderTop: '1px solid olive' }} />
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
