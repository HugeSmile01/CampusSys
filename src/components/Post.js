import React, { useState } from 'react';

const Post = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedPost);
    setIsEditing(false);
  };

  return (
    <div className="post">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="title"
            value={editedPost.title}
            onChange={handleEditChange}
          />
          <textarea
            name="content"
            value={editedPost.content}
            onChange={handleEditChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(post.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Post;
