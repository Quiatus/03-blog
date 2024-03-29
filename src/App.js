import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
	const [posts, setPosts] = useState([])
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [postTitle, setPostTitle] = useState('');
	const [editTitle, setEditTitle] = useState('');
	const [postBody, setPostBody] = useState('');
	const [editBody, setEditBody] = useState('');
	const navigate = useNavigate();
	const { width } = useWindowSize();
	const { data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

	useEffect(() => {
		setPosts(data)
	}, [data])

	useEffect(() => {
		const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase())
		|| ((post.title).toLowerCase()).includes(search.toLowerCase()))
		setSearchResults(filteredResults.reverse())
	},[posts, search])

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

	const handleEdit = async (id) => {
		const editedDatetime = format(new Date(), 'dd MMMM, yyyy HH:mm');
		const post = posts.find(post => (post.id).toString() === id)
		const updatedPost = { id, title: editTitle, datetime:post.datetime , edited: editedDatetime, body: editBody};
		try {
			const response = await api.put(`/posts/${id}`, updatedPost);
			setPosts(posts.map(post => post.id === id ? {...response.data } : post));
			setEditTitle('');
			setEditBody('');
			navigate(`/post/${id}`);
		} catch (err) {
			console.log(`Error: ${err.message}`)
		}
	}

	const handleDelete = async (id) => {
		try { 
			await api.delete(`/posts/${id}`)
			const postsList = posts.filter(post => post.id !== id)
			setPosts(postsList);
			navigate('/');
		} catch (err) {
			console.log(`Error: ${err.message}`)
		}
	}

	return (
		<Routes>
			<Route path="/" element={<Layout 
					search={search} 
					setSearch={setSearch} 
					width={width}
				/>}>
				<Route index element={
					<Home 
						fetchError={fetchError}
						isLoading={isLoading}
						posts={searchResults} 
					/>} />
				<Route path="post">
					<Route index element={<NewPost 
						handleSubmit={handleSubmit}
						postTitle={postTitle}
						setPostTitle={setPostTitle}
						postBody={postBody}
						setPostBody={setPostBody}
					/>} />
					<Route path=":id" element={<PostPage
						posts={posts}
						handleDelete={handleDelete}	
					/>} />
				</Route>
				<Route path="/edit/:id">
					<Route index element={<EditPost 
						posts={posts}
						handleEdit={handleEdit}
						editTitle={editTitle}
						setEditTitle={setEditTitle}
						editBody={editBody}
						setEditBody={setEditBody}
					/>} />
				</Route>
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
  	);
}

export default App;
