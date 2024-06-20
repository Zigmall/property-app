import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// POST /api/messages

export const POST = async (request) => {
  try {
    connectDB();

    const { email, phone, message, property, recipient } = request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', { status: 401 });
    }
    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'Can not send message to yourself' }),
        { status: 400 }
      );
    }
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return Response(JSON.stringify({ message: 'Message sent' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
