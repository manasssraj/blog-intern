import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/');
    } else {
      alert('Wrong password');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '2rem' }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

