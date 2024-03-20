import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ search, setSearch, width }) => {
  return (
    <div className="App">
        <Header title="React JS blog" search={search} setSearch={setSearch} />
        <Outlet />
        <Footer width={width} />
    </div>
  )
}

export default Layout