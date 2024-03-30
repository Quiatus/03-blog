import { useParams, Link } from "react-router-dom"
import { useContext } from 'react';
import DataContext from './context/DataContext';

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  const postBody = post.body.replace(/(?:\r\n|\r|\n)/g, '<br>')

  return (
    <main>
      <div className="post">
        {post && 
          <>
            <h2 className="blogTitlePost">{post.title}</h2>
            <p className="blogDate">{`Posted on: ${post.datetime}. ${post.edited ? ` Last edited on: ${post.edited}.` : ``}`} </p>
            <p className="blogBody" dangerouslySetInnerHTML={{__html: postBody}}></p>
            <hr />
            <div className="postFooter">
              <Link to={`/edit/${post.id}`}>
                <button className="btnSubmit">Edit Post</button>
              </Link>
              
              <button className="btnDel" onClick={() => handleDelete(post.id)}>Delete Post</button>
            </div>
            
          </>
        }
        {!post &&
          <>
            <h2 className="titleError">Post Not Found!</h2>
            
            <p>
              <Link to='/'>Back to Homepage</Link>
            </p>
          </>
        }
      </div>
    </main>
  )
}

export default PostPage