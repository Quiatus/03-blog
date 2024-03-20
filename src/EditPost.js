import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({ posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle}) => {

    const { id } = useParams();
    console.log(id)
    const post = posts.find(post => (post.id).toString() === id)
    
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main>
            {editTitle && 
                <div className="newPost">
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle" >Title:</label>
                    <input
                    id="postTitle" 
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} />
                    <label htmlFor="postBody" >Post:</label>
                    <textarea 
                    id="postBody"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    />
                    <div className="buttons">
                    <button className="btnSubmit" type="submit" onClick={() => handleEdit(post.id)}>Save</button>
                    <button className="btnSubmit" onClick={(e) => {
                        e.preventDefault()
                        setEditTitle('')
                        setEditBody('')
                    }}>Clear</button>
                    <Link to={`/post/${post.id}`}>
                        <button className="btnSubmit" type="submit" onClick={() => handleEdit(post.id)}>Cancel</button>
                    </Link>
                    
                    </div>
                    
                </form>
                </div>
            }
            {!editTitle &&
                <>
                    <h2 className="titleError">Post Not Found!</h2>
                    
                    <p>
                    <Link to='/'>Back to Homepage</Link>
                    </p>
                </>
            }
      </main>
    )
}

export default EditPost