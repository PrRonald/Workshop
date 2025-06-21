import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CheckCircleIcon, ClockIcon, WrenchIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { fetchWorkshops } from '../store/workshopSlice';

function WorkshopList() {
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
  const dispatch = useDispatch();
  const { items: workshops, status, error } = useSelector(state => state.workshops);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWorkshops());
    }
  }, [status, dispatch]);

  if (status === 'loading') return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-600 text-center py-4">{error}</div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Workshops</h1>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop) => (
          <div
            key={workshop._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {workshop.name}
                </h2>
                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {statusIcons[workshop.status]}
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {statusLabels[workshop.status]}
                  </span>
                </div>
              </div>
              <div className="space-y-3 flex-grow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium dark:text-gray-300">Email:</span>{' '}
                  {workshop.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium dark:text-gray-300">Phone:</span>{' '}
                  {workshop.phoneNumber}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium dark:text-gray-300">Date:</span>{' '}
                  {format(new Date(workshop.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{workshop.description}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <Link
                  to={`/workshop/${workshop._id}`}
                  className="btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkshopList;