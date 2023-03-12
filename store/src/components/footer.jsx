export default function Footer() {
    return (
        <footer className="footer container-fluid bg-secondary text-dark mt-5 pt-5">
            <div className="row justify-content-center px-xl-5 pt-5">
                <div className="col-lg-4 col-md-12 mb-5 pe-3 pe-xl-5">
                    <a href="" className="main-title mb-5" style={{ fontSize: "50px" }}><span>Desi</span>Vibes</a>
                    <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
                    <p className="mb-2"><i className="bi bi-geo-alt-fill text-primary me-3"></i>123 Street, New York, USA</p>
                    <p className="mb-2"><i className="bi bi-envelope-fill text-primary me-3"></i>info@example.com</p>
                    <p className="mb-0"><i className="bi bi-telephone-fill text-primary me-3"></i>+012 345 67890</p>
                </div>
                <div className="col-lg-7 col-md-12">
                    <div className="row">
                        <div className="col-md-4 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-dark mb-2" href="/"><i className="bi bi-caret-right-fill me-2"></i>Home</a>
                                <a className="text-dark mb-2" href="/shop"><i className="bi bi-caret-right-fill me-2"></i>Our Shop</a>
                                <a className="text-dark mb-2" href="/checkout"><i className="bi bi-caret-right-fill me-2"></i>Checkout</a>
                                <a className="text-dark" href="/contact"><i className="bi bi-caret-right-fill me-2"></i>Contact Us</a>
                            </div>
                        </div>
                        <div className="col-md-6 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
                            <form action="">
                                <div className="form-group">
                                    <input type="text" className="form-control border-0 py-4" placeholder="Your Name" required /><br />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control border-0 py-4" placeholder="Your Email" required /><br />
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-block border-0 py-3" type="submit">Subscribe Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}