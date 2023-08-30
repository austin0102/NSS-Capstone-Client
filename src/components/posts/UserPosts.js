import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deletePost, getUserPosts } from '../../managers/PostManager'
import "./posts.css";


export function UserPosts({ token }) {
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    getUserPosts(token).then((userPostsData) => setUserPosts(userPostsData));
  }, [token]);

  const handleDeletePost = (postId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this post?");

    if (shouldDelete) {
      deletePost(postId).then(() => {
        const updatedPosts = userPosts.filter((post) => post.id !== postId);
        setUserPosts(updatedPosts);
      });
    }
  };



  return (
    <div className="container">
      <h1 className="posts-title">My Posts</h1>

      <article>
        {userPosts.map((postObject) => (
          <div className="post" key={postObject.id}>
            <div className="title">
              <Link to={`/posts/${postObject.id}`}>{postObject.title}</Link>
            </div>
            <section>
              <div>
                {postObject.author.first_name} {postObject.author.last_name}
              </div>
              <div>{postObject.category.label}</div> <br></br>
              <div className='post-buttons'>
                <button class="delete-icon-button"><i class="fas fa-trash" onClick={() => handleDeletePost(postObject.id)}></i></button>
              </div>
            </section>
          </div>
        ))}
      </article>


    </div>
  );
};
