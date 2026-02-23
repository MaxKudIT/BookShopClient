// app/routing/loaders.ts
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { api } from '../api/api';


const waitForAuth = async () => {
  const auth = getAuth();
  await auth.authStateReady();
  return auth.currentUser;
};


export const protectedLoader = async () => {
  const user = await waitForAuth();

  if (!user) {

    const response = redirect('/auth');
    response.headers.set('X-Replace-History', 'true');
    return response;
  }
 
  return { user };
};


export const protectedPurchaseLoader = async ({ params }: LoaderFunctionArgs) => {

  const { id } = params

  const user = await waitForAuth();
  if (!user) {

    const response = redirect('/auth');
    response.headers.set('X-Replace-History', 'true');
    return response;
  }

  const idToken = await user.getIdToken();

  try {
    const req = await api.get<{ IsMy: boolean }>(`/books/isMy/${id}`, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })
    if (req.data.IsMy) {
      return { allowed: true };
    } else {
      const response = redirect(`/books/${id}`);
      response.headers.set('X-Replace-History', 'true');
      return response;
    }
  }
  catch (err: any) {
    console.error(err?.response.data.error)
  }


}



export const publicLoader = async () => {
  const user = await waitForAuth();

  if (user) {

    const response = redirect('/');
    response.headers.set('X-Replace-History', 'true');
    return response;
  }

  return null;
};