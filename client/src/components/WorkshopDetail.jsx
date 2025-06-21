import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { TrashIcon, PencilIcon, CheckCircleIcon, ClockIcon, WrenchIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { fetchWorkshopById, deleteWorkshop } from '../store/workshopSlice';

function WorkshopDetail() {
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
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentWorkshop: workshop, status, error } = useSelector(state => state.workshops);

  useEffect(() => {
    dispatch(fetchWorkshopById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      try {
        await dispatch(deleteWorkshop(id)).unwrap();
        navigate('/');
      } catch (err) {
        console.error('Failed to delete workshop:', err);
      }
    }
  };

  if (status === 'loading') return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-600 text-center py-4">{error}</div>
  );

  if (!workshop) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{workshop.name}</h1>
              <div className="flex items-center mt-2 space-x-2 bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-full self-start">
                {statusIcons[workshop.status]}
                <span className="text-lg font-medium text-gray-700">
                  {statusLabels[workshop.status]}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
              <Link
                to={`/workshop/edit/${id}`}
                className="btn-secondary flex items-center justify-center w-full sm:w-auto"
              >
                <PencilIcon className="h-5 w-5 mr-1" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn bg-red-600 text-white hover:bg-red-700 flex items-center justify-center w-full sm:w-auto"
              >
                <TrashIcon className="h-5 w-5 mr-1" />
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Workshop Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="mt-1 text-gray-900 dark:text-white">{workshop.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</h3>
                  <p className="mt-1 text-gray-900 dark:text-white">{workshop.phoneNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h3>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {format(new Date(workshop.date), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                  <p className="mt-1 text-gray-900 dark:text-white">{workshop.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkshopDetail;