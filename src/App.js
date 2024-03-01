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
		}
	])
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const navigate = useNavigate();

	return (
		<Routes>
			<Route path="/" element={<Layout 
					search={search} 
					setSearch={setSearch} 
				/>}>
				<Route index element={<Home /*posts={searchResults}*/ />} />
				<Route path="post">
					<Route index element={<NewPost 
						//handleSubmit={handleSubmit}
						//postTitle={postTitle}
						//setPostTitle={setPostTitle}
						//postBody={postBody}
						//setPostBody={setPostBody}
					/>} />
					<Route path=":id" element={<PostPage
						//posts={posts}
						//handleDelete={handleDelete}	
					/>} />
				</Route>
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
  	);
}

export default App;
