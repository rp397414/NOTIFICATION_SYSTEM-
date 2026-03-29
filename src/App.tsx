import React from 'react';
import { useDispatch } from 'react-redux';
import { addNotification, clearNotifications } from './store/notificationSlice';
import NotificationContainer from './components/notificationContainer';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(addNotification({ type: 'success', message: 'Task completed successfully!' }));
  };

  const handleError = () => {
    dispatch(addNotification({ type: 'error', message: 'Failed to fetch data.' }));
  };

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-6">Global Notification System</h1>
      
      <div className="space-x-4">
        <button onClick={handleSuccess} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Trigger Success
        </button>
        <button onClick={handleError} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Trigger Error
        </button>
        <button onClick={() => dispatch(clearNotifications())} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Clear All
        </button>
      </div>

      {/* Place this at the root level of your layout */}
      <NotificationContainer />
    </div>
  );
};

export default App;