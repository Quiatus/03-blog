import Feed from "./Feed"

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main>
        {isLoading && <p>Loading posts...</p>}
        {!isLoading && fetchError && <p className="titleError">{fetchError}</p>}
        {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p>No posts to display</p>)}
    </main>
    
  )
}

export default Home