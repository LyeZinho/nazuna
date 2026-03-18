import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const session = cookies.get('session');
  
  return {
    user: session ? { id: 'user-123' } : null
  };
};
