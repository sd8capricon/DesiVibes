import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar hideCategories />
            <div className="container">
                <div className="row header">
                    <div className="col-3 categories">
                        <ul className="list-group">
                            <li className="list-group-item">Shop by Category</li>
                            <li className="list-group-item"><a href="/category/shirts">Shirts</a></li>
                            <li className="list-group-item"><a href="/category/tshirts">T-shirts</a></li>
                            <li className="list-group-item"><a href="/category/jeans">Jeans</a></li>
                            <li className="list-group-item"><a href="/category/sweatshirts">Sweatshirts</a></li>
                            <li className="list-group-item"><a href="/category/hoodies">Hoodies</a></li>
                            <li className="list-group-item"><a href="/category/jackets">Jackets</a></li>
                            <li className="list-group-item"><a href="/category/sportswear">SportsWear</a></li>
                            <li className="list-group-item"><a href="/category/blzers">Blazers</a></li>
                        </ul>
                    </div>
                    <div className="col-9">
                        <div id="carouselExample" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://source.unsplash.com/random/1920x1080" className="img-fluid" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://source.unsplash.com/random/1280x700" className="img-fluid" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://source.unsplash.com/random/1280x730" className="img-fluid" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev carousel-control" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next carousel-control" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}