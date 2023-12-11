import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar id="home" />
            {children}
            <Footer id="contact" />
        </div>
    )
}

export default Layout