export default function Navbar() {
    return (
        <div className="container-fluid mb-5">
            <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">DesiVibes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav mr-auto py-0">
                            <a href="index.html" className="nav-item nav-link active">Home</a>
                            <a href="shop.html" className="nav-item nav-link">Shop</a>
                            <a href="detail.html" className="nav-item nav-link">Shop Detail</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a href="cart.html" className="dropdown-item">Shopping Cart</a>
                                    <a href="checkout.html" className="dropdown-item">Checkout</a>
                                </div>
                            </div>
                            <div className="nav-item dropdown d-lg-hidden d-md-none">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Categories</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a href="" className="dropdown-item">Shirts</a>
                                    <a href="" className="dropdown-item">Jeans</a>
                                    <a href="" className="dropdown-item">Swimwear</a>
                                    <a href="" className="dropdown-item">Sleepwear</a>
                                    <a href="" className="dropdown-item">Sportswear</a>
                                    <a href="" className="dropdown-item">Jumpsuits</a>
                                    <a href="" className="dropdown-item">Blazers</a>
                                    <a href="" className="dropdown-item">Jackets</a>
                                    <a href="" className="dropdown-item">Shoes</a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">Contact</a>
                        </div>
                        <div className="navbar-nav ms-auto py-0">
                            <a href="/auth" className="nav-item nav-link btn btn-primary">Login/Register</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}