import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import axios from '../../Config/axios';
import apiClient from '../../Config/axios';

interface User {
  id: number;
  username: string;
}


const fetchUsers = async (searchTerm: any) => {
  const use_URL = `/users/?search=${searchTerm}`
  try {
    const response = await apiClient.get(use_URL);
    console.log('Appointments Data:', response.data);
    return response.data;  // Return the actual data
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');




  useEffect(() => {
    const fetchAndSetAppointments = async () => {
      try {
        const appointmentsData = await fetchUsers(searchTerm);
        console.log('appointmentsData:', appointmentsData)


        setUsers(appointmentsData);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAndSetAppointments();  // Call the async function inside useEffect
  }, [searchTerm]);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (error) return <p>Error fetching users</p>;

  //   const filteredUsers = users?.filter(user =>
  //     user.username.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  return (
    <div className="mx-5 p-4">
      <p className='text-2xl text-black mb-2'>Users</p>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul>
        {users.length > 0 ? (users?.map((user) => (
          <li key={user.id} className="border p-2 mb-2">
            {user.username}
          </li>
        ))) :
          <p className='text-2xl text-gray-400 mt-7'>No user Found.</p>
        }
      </ul>
    </div>
  );
};

export default Users;
