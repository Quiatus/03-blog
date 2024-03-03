import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <main>
      <h2 className="titleError">Post Not Found!</h2>
            
      <p>
        <Link to='/'>Back to Homepage</Link>
      </p>
    </main>
  )
}

export default Missing