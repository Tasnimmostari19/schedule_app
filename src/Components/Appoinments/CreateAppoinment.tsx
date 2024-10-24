import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

interface AppointmentData {
    title: string;
    description: string;
    date: string;
}

const createAppointment = async (appointment: AppointmentData) => {
    const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
    });
    if (!response.ok) {
        throw new Error('Failed to create appointment');
    }
    return response.json();
};

const CreateAppointment: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(createAppointment, {
        onSuccess: () => {
            queryClient.invalidateQueries('appointments');
            navigate('/appointments');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dateTime = `${date}T${time}:00`; // Combine date and time into a single datetime string
        mutation.mutate({ title, description, date: dateTime });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Create Appointment</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                    Create Appointment
                </button>
            </form>
        </div>
    );
};

export default CreateAppointment;
