import axios from 'axios';
import useAsync from './useAsync';

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

async function getUser(id: number): Promise<User> {
  const response = await axios.get<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

type UserProps = {
  id: number;
};

function User({ id }: UserProps) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div style={{ margin: '24px' }}>
      <h2 style={{ color: '#97943a' }}>{user.username}</h2>
      <p style={{ color: '#cac422' }}>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
