import dynamic from 'next/dynamic';
import Head from 'next/head';
import withAuth from '../components/withAuth'; // ✅ optional, only if login protection is used

const PostForm = dynamic(() => import('../components/PostForm'), { ssr: false });

function CreatePage() {
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <main>
        <PostForm />
      </main>
    </>
  );
}

// ✅ Make sure this is the last line
export default withAuth(CreatePage); // If using login


