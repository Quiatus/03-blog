import { useState, useContext } from 'react';
import DataContext from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import { format } from 'date-fns';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
	const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext)

  const handleSubmit = async (e) => {
		e.preventDefault();
		const id = posts.length ? (parseInt(posts[posts.length - 1].id) + 1).toString() : '1';
		const datetime = format(new Date(), 'dd MMMM, yyyy HH:mm');
		const newPost = { id, title: postTitle, datetime, edited: null, body: postBody}

		try {
			const response = await api.post('/posts', newPost);

			const allPosts = [ ...posts, response.data]
			setPosts(allPosts)
			setPostTitle('')
			setPostBody('')
			navigate('/')
		} catch (err) {
			console.log(`Error: ${err.message}`)
		}
	}

  return (
    <main>
      <div className="newPost">
        <h2>New Post</h2>
        <form className="newPostForm" onSubmit={handleSubmit}>
          <label htmlFor="postTitle" >Title:</label>
          <input
            id="postTitle" 
            type="text"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)} />
          <label htmlFor="postBody" >Post:</label>
          <textarea 
            id="postBody"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <div className="buttons">
            <button className="btnSubmit" type="submit">Submit</button>
            <button className="btnSubmit" onClick={(e) => {
              e.preventDefault()
              setPostTitle('')
              setPostBody('')
            }}>Clear</button>
          </div>
          
        </form>
      </div>
    </main>
  )
}

export default NewPost