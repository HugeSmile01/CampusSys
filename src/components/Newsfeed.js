import React, { useState, useEffect } from 'react';
import { getPosts, addPost, updatePost, deletePost } from '../utils/api';
import { useIndexedDB } from '../utils/storage';
import Post from './Post';

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { getAll, add, update, remove } = useIndexedDB('posts');

  useEffect(() => {
    const fetchPosts = async () => {
      const localPosts = await getAll();
      setPosts(localPosts);

      const remotePosts = await getPosts();
      setPosts(remotePosts);
    };

    fetchPosts();
  }, [getAll]);

  const handleAddPost = async (post) => {
    const newPost = await addPost(post);
    setPosts([...posts, newPost]);
    await add(newPost);
  };

  const handleUpdatePost = async (post) => {
    const updatedPost = await updatePost(post);
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    await update(updatedPost);
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
    setPosts(posts.filter((p) => p.id !== postId));
    await remove(postId);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="newsfeed">
      <h2>Newsfeed</h2>
      <button onClick={() => handleAddPost({ title: 'New Post', content: 'This is a new post.' })}>
        Add Post
      </button>
      {currentPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
        />
      ))}
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
