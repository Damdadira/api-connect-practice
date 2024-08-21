import axios from 'axios';
import useAsync from './useAsync';

async function getUers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

export default function Users() {
  const [state, refetch] = useAsync(getUers, [], true);

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error occurred: {error}</div>;
  if (!users)
    return (
      <button
        style={{ margin: '24px', background: 'lavender', color: 'royalblue' }}
        onClick={refetch}
      >
        불러오기
      </button>
    );

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
        style={{
          margin: '24px',
          background: 'royalblue',
          color: 'ghostwhite',
        }}
        onClick={refetch}
      >
        다시 불러오기
      </button>
    </>
  );
}
