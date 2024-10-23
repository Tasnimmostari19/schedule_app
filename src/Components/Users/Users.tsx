import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import axios from '../../Config/axios';

interface User {
    id: number;
    username: string;
}

const Users= () => {
      const [users,setUsers] = useState();
      const [searchTerm, setSearchTerm] = useState<string>('');

    const use_URL=`/users/?search=${searchTerm}`

    const fetchUsers = async () => {
      const response = await axios.get(use_URL)
      // navigate('/login');
      console.log('hjgdfjhf',JSON.stringify(response));
      return response.data;
    };

    useEffect(async ()=>{
      const some= await fetchUsers();
      setUsers(some)

    },[searchTerm])

    //   if (isLoading) return <p>Loading...</p>;
    //   if (error) return <p>Error fetching users</p>;

    //   const filteredUsers = users?.filter(user =>
    //     user.username.toLowerCase().includes(searchTerm.toLowerCase())
    //   );

    return (
        <div className="container mx-auto p-4">
            {/* <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul>
        {filteredUsers?.map((user) => (
          <li key={user.id} className="border p-2 mb-2">
            {user.username}
          </li>
        ))}
      </ul> */}
        </div>
    );
};

export default Users;
