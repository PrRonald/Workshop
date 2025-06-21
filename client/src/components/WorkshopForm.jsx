import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkshop, updateWorkshop, fetchWorkshopById } from '../store/workshopSlice';
import { CheckCircleIcon, ClockIcon, WrenchIcon, XCircleIcon } from '@heroicons/react/24/outline';

function WorkshopForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentWorkshop, status, error: storeError } = useSelector(state => state.workshops);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'waiting-for-parts'
  });

  const statusIcons = {
    'complete': <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    'in-progress': <ClockIcon className="h-6 w-6 text-blue-500" />,
    'waiting-for-parts': <WrenchIcon className="h-6 w-6 text-yellow-500" />,
    'cancelled': <XCircleIcon className="h-6 w-6 text-red-500" />
  };

  const statusLabels = {
    'complete': 'Complete',
    'in-progress': 'In Progress',
    'waiting-for-parts': 'Waiting for Parts',
    'cancelled': 'Cancelled'
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkshopById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && currentWorkshop) {
      setFormData({
        ...currentWorkshop,
        date: new Date(currentWorkshop.date).toISOString().split('T')[0]
      });
    }
  }, [id, currentWorkshop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (id) {
        await dispatch(updateWorkshop({ id, workshopData: formData })).unwrap();
      } else {
        await dispatch(createWorkshop(formData)).unwrap();
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  if (id && status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {id ? 'Edit Workshop' : 'Create New Workshop'}
      </h1>

      {(error || storeError) && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error || storeError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <div>
          <label htmlFor="name" className="label dark:text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label className="label dark:text-gray-300">Status</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {Object.entries(statusLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => handleChange({ target: { name: 'status', value } })}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${formData.status === value ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500'}`}
              >
                {statusIcons[value]}
                <span className={`font-medium ${formData.status === value ? 'text-primary-700 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="label">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date || ''}
            onChange={handleChange}
            className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-primary-500"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-primary-500"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Saving...' : (id ? 'Update Workshop' : 'Create Workshop')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkshopForm;