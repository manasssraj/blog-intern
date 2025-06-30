import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await Post.findOne({ slug });
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      res.status(200).json({ success: true, post });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else if (req.method === 'PUT') {
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}else if (req.method === 'DELETE') {
  try {
    const deletedPost = await Post.findOneAndDelete({ slug });
    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
   
