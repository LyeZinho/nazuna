// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = async ({ cookies, url }: Parameters<LayoutServerLoad>[0]) => {
  const session = cookies.get('session');
  
  return {
    user: session ? { id: 'user-123' } : null
  };
};
