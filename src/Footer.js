import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize';

const Footer = () => {
  const { width } = useWindowSize()

  return (
    <footer className="Footer">© 2024 Quiatus 
    
    {width < 768 ? <FaMobileAlt /> 
        : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
    </footer>
  )
}

export default Footer