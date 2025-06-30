import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
          router.replace('/login');
        }
      }
    }, [router]);

    return <Component {...props} />;
  };
}
