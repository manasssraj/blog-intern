import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import withAuth from '../../components/withAuth'; // ✅ Add this

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function EditPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      const data = await res.json();
      if (data.success) {
        setTitle(data.post.title);
        setContent(data.post.content);
      }
    };

    fetchPost();
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert('Post updated!');
      router.push('/');
    } else {
      alert('Failed to update post');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default withAuth(EditPost); // ✅ Wrap with login protection
