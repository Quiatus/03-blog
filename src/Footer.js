import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Footer = () => {
  const { width } = useContext(DataContext)

  return (
    <footer className="Footer">© 2024 Quiatus 
    
    {width < 768 ? <FaMobileAlt /> 
        : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
    </footer>
  )
}

export default Footer