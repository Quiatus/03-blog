import { useContext } from 'react';
import DataContext from './context/DataContext';

const NewPost = () => {
  const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } = useContext(DataContext)
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