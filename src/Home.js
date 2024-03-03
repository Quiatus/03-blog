import Feed from "./Feed"

const Home = ({ posts }) => {
  return (
    <main>
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <h2 className="titleError">No posts found!</h2>
      )}

    </main>
    
  )
}

export default Home