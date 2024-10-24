import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import apiClient from '../../Config/axios';
import dayjs from 'dayjs';

interface Appointment {
  id: number;
  title: string;
  date: string;
}

// The endpoint for fetching appointments

const fetchAppointments = async (searchTerm, dateFilter): Promise<Appointment[]> => {
  const appointment_URL = `/appointments/`;
  try {
    const response = await apiClient.get(appointment_URL);
    console.log('Appointments Data:', response.data);
    return response.data;  // Return the actual data
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

const Appointments: React.FC = () => {
  // const { data: appointments, error, isLoading } = useQuery<Appointment[]>('appointments', fetchAppointments);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [appointments, setAppointments] = useState<any>([]);
  // const [filterType, setFilterType] = useState<string>('all'); // 'all', 'upcoming', 'past'
  const [dateFilter, setDateFilter] = useState<string>(''); // For date-wise filter

  useEffect(() => {
    const fetchAndSetAppointments = async () => {
      try {
        const appointmentsData = await fetchAppointments(searchTerm, dateFilter);
        console.log('appointmentsData:', appointmentsData)


        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAndSetAppointments();  // Call the async function inside useEffect
  }, [searchTerm]);

  // Helper function to check if an appointment is upcoming or past
  // const isUpcoming = (date: string) => dayjs(date).isAfter(dayjs());

  // Filter appointments based on search, filter type (upcoming/past), and date
  // const filteredAppointments = appointments?.filter(app => {
  //   const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || app.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilterType = filterType === 'all' || (filterType === 'upcoming' && isUpcoming(app.date)) || (filterType === 'past' && !isUpcoming(app.date));
  //   const matchesDateFilter = dateFilter === '' || dayjs(app.date).isSame(dayjs(dateFilter), 'day');
  //   return matchesSearch && matchesFilterType && matchesDateFilter;
  // });

  console.log('sdfsd', appointments);


  return (
    <div className="mx-4 p-4">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>


      <div className='grid grid-flow-col gap-2 justify-center mb-4'>
        <div>
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2"
          />
        </div>

        <div>
          {/* Date Filter */}
          <input
            type="date"
            // value={dateFilter}
            // onChange={(e) => setDateFilter(e.target.value)}
            className="border p-2"
          />
        </div>
        <div
          className=''
        >
          <Link to="/create-appointment"
          >
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Create Appointment</button>
          </Link>
        </div>
      </div>

      <div className='grid grid-rows-2 grid-flow-col gap-2'>
        {appointments?.map(app => (
          <div key={app._id} className="border p-2 mb-2">
            <h3 className="font-bold">{app.title}</h3>
            <p>{app.description}</p>
            <p className="text-sm te0xt-gray-500">{dayjs(app.date).format('MMMM D, YYYY h:mm A')}</p>
          </div>
        ))}
        {appointments?.length === 0 && <p className='text-2xl text-gray-400 mt-5'>No appointments found.</p>}
      </div>
    </div>
  );
};


export default Appointments;
