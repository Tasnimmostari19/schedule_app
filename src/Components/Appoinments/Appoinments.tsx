import { useQuery } from 'react-query';

interface Appointment {
  id: number;
  title: string;
  date: string;
}

const fetchAppointments = async (): Promise<Appointment[]> => {
    const response = await fetch('/api/appointments');  // Replace with your API endpoint
    return response.json();
  };

const Appointments: React.FC = () => {
    // const { data: appointments, error, isLoading } = useQuery<Appointment[]>('appointments', fetchAppointments);

    // const [searchTerm, setSearchTerm] = useState<string>('');
    // const [filterType, setFilterType] = useState<string>('all'); // 'all', 'upcoming', 'past'
    // const [dateFilter, setDateFilter] = useState<string>(''); // For date-wise filter
  
    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error fetching appointments</p>;
  
    // Helper function to check if an appointment is upcoming or past
    // const isUpcoming = (date: string) => dayjs(date).isAfter(dayjs());
  
    // Filter appointments based on search, filter type (upcoming/past), and date
    // const filteredAppointments = appointments?.filter(app => {
    //   const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || app.description.toLowerCase().includes(searchTerm.toLowerCase());
    //   const matchesFilterType = filterType === 'all' || (filterType === 'upcoming' && isUpcoming(app.date)) || (filterType === 'past' && !isUpcoming(app.date));
    //   const matchesDateFilter = dateFilter === '' || dayjs(app.date).isSame(dayjs(dateFilter), 'day');
    //   return matchesSearch && matchesFilterType && matchesDateFilter;
    // });
    
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
  
        {/* Filter Type (Upcoming, Past, All) */}
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filterType === 'all'}
              onChange={() => setFilterType('all')}
            />
            <span className="ml-2">All</span>
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="filter"
              value="upcoming"
              checked={filterType === 'upcoming'}
              onChange={() => setFilterType('upcoming')}
            />
            <span className="ml-2">Upcoming</span>
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="past"
              checked={filterType === 'past'}
              onChange={() => setFilterType('past')}
            />
            <span className="ml-2">Past</span>
          </label>
        </div>
  
        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
  
        {/* Display Filtered Appointments */}
        <ul>
          {filteredAppointments?.map(app => (
            <li key={app.id} className="border p-2 mb-2">
              <h3 className="font-bold">{app.title}</h3>
              <p>{app.description}</p>
              <p className="text-sm text-gray-500">{dayjs(app.date).format('MMMM D, YYYY h:mm A')}</p>
            </li>
          ))}
          {filteredAppointments?.length === 0 && <p>No appointments found.</p>}
        </ul>
      </div>
    );
  };
  

export default Appointments;
