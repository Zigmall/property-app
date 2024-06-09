import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

//GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property) return new Response('Property Not Found', { status: 404 });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.cog(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

//DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    // Check for session
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }
    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById(propertyId);

    if (!property) return new Response('Property Not Found', { status: 404 });

    // Verify ownership
    if (userId !== property.owner.toString()) {
      return new Response('Unauthorized', { status: 401 });
    } else {
      await Property.deleteOne();
    }

    return new Response(`Property ${propertyId} deleted`, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
