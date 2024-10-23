import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <Link to="/" className="mr-6">Home</Link>
          <Link to="/users" className="mr-6">Users</Link>
          <Link to="/appointments" className="mr-6">Appointments</Link>
          <Link to="/create-appointment" className="mr-6">Create Appointment</Link>
        </div>
        <div>
          <Link to="/login" className="text-white mr-4">Login</Link>
          <Link to="/register" className="text-white">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
