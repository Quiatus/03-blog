import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="App">
        <Header title="React JS blog" />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout