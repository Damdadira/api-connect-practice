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

  console.log(users, setUsers);
  console.log(loading, setLoading);
  console.log(error, setError);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //요청 시작할때는 error, users 초기화
        setError(null);
        setUsers(null);

        //loading 상태를 true로 변경
        setLoading(true);

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        setUsers(response.data);
      } catch (e) {
        setError(e as Error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error occurred: {error.message}</div>;
  if (!users) return null;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.username})
        </li>
      ))}
    </ul>
  );
}
