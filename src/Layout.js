import Header from './Header';

import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ search, setSearch }) => {
  return (
    <div className="App">
        <Header title="React JS blog" search={search} setSearch={setSearch} />
        
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout