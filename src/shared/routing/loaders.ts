// app/routing/loaders.ts
import { redirect } from 'react-router-dom';
import { getAuth } from 'firebase/auth';


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


export const publicLoader = async () => {
  const user = await waitForAuth();
  
  if (user) {
   
    const response = redirect('/');
      response.headers.set('X-Replace-History', 'true');
    return response; 
  }
  
  return null;
};