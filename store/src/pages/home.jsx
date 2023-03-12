import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import ProductPreview from "../components/home/product-peview"

import { db } from "../firebase-config"
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore"

import carousel1 from "../../public/imgs/carousel-1.jpg"
import carousel2 from "../../public/imgs/carousel-2.jpg"

export default function Home() {
    const [newArrivals, setNewArrivals] = useState([])
    const [bestSellers, setBestSellers] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [showProducts, setShowProducts] = useState({ newArrivals: true, bestSellers: true })

    const bestLimit = 3
    const newArrivalsLimit = 10
    const featuredLimit = 5

    useEffect(() => {
        async function fetchProducts() {
            const qBest = query(collection(db, "products"), orderBy("purchased", "desc"), limit(bestLimit))
            const qNew = query(collection(db, "products"), orderBy("updatedAt", "desc"), limit(newArrivalsLimit))
            const qFeatured = query(collection(db, "products"), where("featured", "==", true), limit(featuredLimit))
            let resBest = await getDocs(qBest)
            let resNew = await getDocs(qNew)
            let resFeatured = await getDocs(qFeatured)
            resNew = resNew.docs.filter(doc => !resBest.docs.map(doc => doc.id).includes(doc.id))
            setBestSellers(resBest.docs.map(doc => doc.data()))
            setNewArrivals(resNew.map(doc => doc.data()))
            setFeaturedProducts(resFeatured.docs.map(doc => doc.data()))
        }
        fetchProducts()
    }, [])

    return (
        <>
            <Navbar hideCategories />
            <div className="container">
                <div className="row header justify-content-center">
                    <div className="col-3 d-none d-md-block categories">
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
                    <div className="col-12 col-md-9">
                        <div id="carouselExample" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={carousel1} className="img-fluid" alt="carousel-1" />
                                </div>
                                <div className="carousel-item">
                                    <img src={carousel2} className="d-block img-fluid" alt="carousel-2" />
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
            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3 justify-content-between">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "10px" }}>
                            <h1 className="bi bi-check text-primary m-0 me-3" style={{ fontSize: "70px" }}></h1>
                            <h5 className="fW-bold m-0" style={{ fontSize: "20px" }}>Quality Product</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "10px" }}>
                            <h1 className="bi bi-currency-exchange text-primary m-0 me-3" style={{ fontSize: "70px" }}></h1>
                            <h5 className="fW-bold m-0" style={{ fontSize: "20px" }}>14-Day Return</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "10px" }}>
                            <h1 className="bi bi-arrow-clockwise text-primary m-0 me-3" style={{ fontSize: "70px" }}></h1>
                            <h5 className="fW-bold m-0" style={{ fontSize: "20px" }}>24/7 Support</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "10px" }}>
                            <h1 className="bi bi-globe-americas text-primary m-0 me-3" style={{ fontSize: "70px" }}></h1>
                            <h5 className="fW-bold m-0" style={{ fontSize: "20px" }}>Eco-friendly</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Filter */}
            <section className="container mb-4">
                <div className="section-title">
                    <h2>Top Products</h2>
                </div>
                <div className="row g-0 justify-content-center">
                    <div className="d-flex flex-wrap justify-content-center mt-5 filter-button-group">
                        <button type="button" className={`btn m-2 text-dark${showProducts.bestSellers && showProducts.newArrivals && " btn-primary"}`} onClick={(e) => setShowProducts({ bestSellers: true, newArrivals: true })}>All</button>
                        <button type="button" className={`btn m-2 text-dark${showProducts.bestSellers && !showProducts.newArrivals && " btn-primary"}`} onClick={(e) => setShowProducts({ bestSellers: true, newArrivals: false })} >Best Sellers</button>
                        <button type="button" className={`btn m-2 text-dark${!showProducts.bestSellers && showProducts.newArrivals && " btn-primary"}`} onClick={(e) => setShowProducts({ bestSellers: false, newArrivals: true })} >New Arrivals</button>
                    </div>
                    <div className="row mt-3">
                        {showProducts.bestSellers && bestSellers.map(product => (
                            <ProductPreview key={product.id} product={product} />
                        ))}
                        {showProducts.newArrivals && newArrivals.map(product => (
                            <ProductPreview key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section >

            {/* Featured */}
            <section className="container mt-5 pt-4">
                <div className="section-title">
                    <h2>Featured Products</h2>
                </div>
                <div className="row justify-content-center mt-5">
                    {featuredProducts.map(product => (
                        <ProductPreview key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}