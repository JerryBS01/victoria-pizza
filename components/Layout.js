import Navbar from './navbar';
import Footer from './footer';

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