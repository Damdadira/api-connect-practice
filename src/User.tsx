import React, { useState, useEffect } from 'react';
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

export default function Users() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      //요청 시작할때는 error, users 초기화
      setError(null);
      setUsers(null);

      //loading 상태를 true로 변경
      setLoading(true);

      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
        // 'https://jsonplaceholder.typicode.com/users2' //주소를 다르게 바꾸면 404 에러 발생
      );
      setUsers(response.data);
    } catch (e) {
      setError(e as Error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error occurred: {error.message}</div>;
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
