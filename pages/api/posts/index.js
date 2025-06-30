import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { title, content } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    try {
      const newPost = await Post.create({ title, content, slug });
      res.status(201).json({ success: true, post: newPost });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
