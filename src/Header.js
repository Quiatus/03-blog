import Nav from './Nav';

const Header = ({ title, search, setSearch }) => {
  return (
    <header className="Header">
        <h1>{title}</h1>
        <Nav search={search} setSearch={setSearch} />
    </header>
  )
}

export default Header