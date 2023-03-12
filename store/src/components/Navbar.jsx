import { useAuth } from "../contexts/AuthContext"

export default function Navbar({ hideCategories }) {
    const { currentUser, userFromDB, logout } = useAuth()

    return (
        <div className="container-fluid shadow py-2 mb-4">
            <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand main-title" href="#"><span>Desi</span>Vibes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav flex justify-content-center">
                            <a href="/" className="nav-item nav-link active">Home</a>
                            <a href="shop.html" className="nav-item nav-link">Shop</a>
                            <a href="detail.html" className="nav-item nav-link">About Us</a>
                            {!hideCategories && <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Shop by Category</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a className="dropdown-item" href="/category/shirts">Shirts</a>
                                    <a className="dropdown-item" href="/category/tshirts">T-shirts</a>
                                    <a className="dropdown-item" href="/category/jeans">Jeans</a>
                                    <a className="dropdown-item" href="/category/sweatshirts">Sweatshirts</a>
                                    <a className="dropdown-item" href="/category/hoodies">Hoodies</a>
                                    <a className="dropdown-item" href="/category/jackets">Jackets</a>
                                    <a className="dropdown-item" href="/category/sportswear">SportsWear</a>
                                    <a className="dropdown-item" href="/category/blzers">Blazers</a>
                                </div>
                            </div>}
                            <a href="contact.html" className="nav-item nav-link">Contact</a>
                        </div>
                        <div className="navbar-nav right ms-auto py-0">
                            {currentUser && userFromDB ?
                                <div className="d-flex nav-icons">
                                    <a href="/checkout" className="nav-icon">
                                        <i className="bi bi-cart-fill" />
                                        <span className="ms-2">{userFromDB.cart.length}</span>
                                    </a>
                                    <a href="/profile" className="nav-icon">
                                        <i className="bi bi-person-circle" />
                                        <span className="ms-2 fs-6">{currentUser.displayName}</span>
                                    </a>
                                    <a href="/auth" className="nav-item nav-link btn btn-primary" onClick={logout} style={{ fontSize: 'inherit' }}>Logout</a>
                                </div> :
                                <a href="/auth" className="nav-item nav-link btn btn-primary">Login/Register</a>
                            }
                        </div>
                    </div>
                </div >
            </nav >
        </div >
    )
}