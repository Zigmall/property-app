'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { sender, property, email, phone, body, createdAt } = message;

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  const handleToggleReadStatus = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        if (read) {
          toast.success('Message marked as red');
        } else {
          toast.success('Message marked as new');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        setIsDeleted(true);
        toast.success('Message deleted successfully');
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead && (
        <div
          className={`absolute top-2, right-2 bg-yellow-500 text-white px-2 py-1 rounded-md`}
        >
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span> {property.name}
      </h2>
      <p className='text-gray-700'>{body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Name:</strong> {sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${email}`} className='text-blue-500'>
            {' '}
            {email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${phone}`} className='text-blue-500'>
            {' '}
            {phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {formatDate(new Date(createdAt))}
        </li>
      </ul>
      <button
        onClick={handleToggleReadStatus}
        className={`mt-4 mr-3 ${
          isRead ? 'bg-gray-500 ' : 'bg-blue-500 text-white'
        }  py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark as new' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDelete}
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
