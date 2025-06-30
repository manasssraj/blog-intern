import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function ViewPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      const data = await res.json();
      if (data.success) {
        setPost(data.post);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
      </Head>
      <main style={{ padding: '1rem' }}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  );
}
