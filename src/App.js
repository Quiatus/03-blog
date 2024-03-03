import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
	const [posts, setPosts] = useState([
		{
			id: 1,
			title: "First Post",
			datetime: "March 01, 2024 12:05:18",
			body: "Lorem ipsum dolor sit amet."
		},
		{
			id: 2,
			title: "Second Post",
			datetime: "March 02, 2024 12:05:18",
			body: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. "
		}
	])
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [postTitle, setPostTitle] = useState('');
	const [postBody, setPostBody] = useState('');

	const navigate = useNavigate();

	const handleSubmit = () => {

	}

	const handleDelete = (id) => {
		const postsList = posts.filter(post => post.id !== id)
		setPosts(postsList);
		navigate('/');
	}

	return (
		<Routes>
			<Route path="/" element={<Layout 
					search={search} 
					setSearch={setSearch} 
				/>}>
				<Route index element={<Home posts={posts} />} />
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
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
  	);
}

export default App;
