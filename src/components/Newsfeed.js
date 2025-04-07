import React, { useState, useEffect } from 'react';
import { getPosts, addPost, updatePost, deletePost } from '../utils/api';
import { useIndexedDB } from '../utils/storage';
import Post from './Post';

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('mostRecent');
  const { getAll, add, update, remove } = useIndexedDB('posts');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const localPosts = await getAll();
    setPosts(localPosts);

    const remotePosts = await getPosts();
    setPosts(remotePosts);
  };

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === '') return true;
    return post.category === filter || post.tags.includes(filter) || post.date.includes(filter);
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sort === 'mostRecent') return new Date(b.date) - new Date(a.date);
    if (sort === 'mostLiked') return b.likes - a.likes;
    if (sort === 'mostCommented') return b.comments.length - a.comments.length;
    return 0;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="newsfeed">
      <h2>Newsfeed</h2>
      <button onClick={() => handleAddPost({ title: 'New Post', content: 'This is a new post.' })}>
        Add Post
      </button>
      <div className="filter-sort">
        <label>
          Filter by:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
        <label>
          Sort by:
          <select value={sort} onChange={handleSortChange}>
            <option value="mostRecent">Most Recent</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostCommented">Most Commented</option>
          </select>
        </label>
      </div>
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
