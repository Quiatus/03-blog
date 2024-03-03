import Feed from "./Feed"

const Home = ({ posts }) => {
  return (
    <main>
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <h2 className="titleError">Nothing is posted yet!</h2>
      )}

    </main>
    
  )
}

export default Home