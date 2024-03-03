import { Link } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <div>
        <div className="blogPost">
            <Link to={`/post/${post.id}`}>
                <h2 className="blogTitle">{post.title}</h2>
            </Link>
            <p className="blogDate">{post.datetime}</p>
            <p className="blogSnippet">{
                (post.body).length <= 25
                    ? post.body
                    : `${(post.body).slice(0, 75)}...`
            }</p>
        </div>
        <hr /> 
    </div>

  )
}

export default Post