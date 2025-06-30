import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>All Blog Posts</h1>

      {/* 🔐 Logout button */}
      <button
        onClick={() => {
          localStorage.removeItem('isAdmin');
          window.location.reload();
        }}
        style={{ marginBottom: '1rem' }}
      >
        Logout
      </button>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ marginBottom: '1.5rem' }}>
            <h2>{post.title}</h2>

            <Link href={`/post/${post.slug}`}>
              <p style={{ color: 'blue', cursor: 'pointer' }}>Read Post →</p>
            </Link>

            <Link href={`/edit/${post.slug}`}>
              <button style={{ marginRight: '10px' }}>Edit</button>
            </Link>

            <button
              onClick={async () => {
                if (confirm('Are you sure you want to delete this post?')) {
                  const res = await fetch(`/api/posts/${post.slug}`, {
                    method: 'DELETE',
                  });
                  if (res.ok) {
                    alert('Post deleted');
                    window.location.reload();
                  } else {
                    alert('Failed to delete post');
                  }
                }
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </main>
  );
}

