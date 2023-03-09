import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar hideCategories />
            <div className="container">
                <div className="row header">
                    <div className="col-3 categories">
                        <ul className="list-group">
                            <li className="list-group-item"><h3>Categories</h3></li>
                            <li className="list-group-item"><a href="/">Shirts</a></li>
                            <li className="list-group-item"><a href="/">T-shirts</a></li>
                            <li className="list-group-item"><a href="/">Jeans</a></li>
                            <li className="list-group-item"><a href="/">Sweatshirts</a></li>
                            <li className="list-group-item"><a href="/">Hoodies</a></li>
                            <li className="list-group-item"><a href="/">Jackets</a></li>
                            <li className="list-group-item"><a href="/">SportsWear</a></li>
                            <li className="list-group-item"><a href="/">Blazers</a></li>
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