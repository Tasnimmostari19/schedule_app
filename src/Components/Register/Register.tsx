import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Config/axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const registration_URl='/register'

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = axios.post(registration_URl,
      JSON.stringify({username,password}),{
        headers:{'content-Type':'application/json'},
        withCredentials:true
      }
    )
    // navigate('/login');
    console.log('hjgdfjhf',JSON.stringify(response));
  };

  
  

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
