import { useParams, Link } from "react-router-dom"

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  return (
    <main>
      <div className="post">
        {post && 
          <>
            <h2 className="blogTitlePost">{post.title}</h2>
            <p className="blogDate">{`Posted on: ${post.datetime}`}</p>
            <p className="blogBody">{post.body}</p>
            <div className="postFooter">
              
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