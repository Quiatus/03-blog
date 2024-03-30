import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from 'react';
import DataContext from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';

const EditPost = () => {
    const { posts, setPosts} = useContext(DataContext)
    const [editTitle, setEditTitle] = useState('');
	const [editBody, setEditBody] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find(post => (post.id).toString() === id)
    
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) => {
		const editedDatetime = format(new Date(), 'dd MMMM, yyyy HH:mm');
		const post = posts.find(post => (post.id).toString() === id)
		const updatedPost = { id, title: editTitle, datetime:post.datetime , edited: editedDatetime, body: editBody};
		try {
			const response = await api.put(`/posts/${id}`, updatedPost);
			setPosts(posts.map(post => post.id === id ? {...response.data } : post));
			setEditTitle('');
			setEditBody('');
			navigate(`/posts/${id}`);
		} catch (err) {
			console.log(`Error: ${err.message}`)
		}
	}

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
                        //setEditTitle('')
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