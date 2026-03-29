import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { type Notification, removeNotification } from '../store/notificationSlice';

interface Props {
  notification: Notification;
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  const typeStyles = {
    success: 'bg-green-100 border-green-500 text-green-800',
    error: 'bg-red-100 border-red-500 text-red-800',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    info: 'bg-blue-100 border-blue-500 text-blue-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      layout
      className={`flex justify-between items-center p-4 mb-3 border-l-4 rounded shadow-md pointer-events-auto min-w-[300px] ${typeStyles[notification.type]}`}
    >
      <span className="font-medium">{notification.message}</span>
      <button
        onClick={() => dispatch(removeNotification(notification.id))}
        className="ml-4 text-gray-500 hover:text-gray-800 font-bold"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default NotificationItem;