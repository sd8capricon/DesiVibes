import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ProductPreview from "../components/home/product-peview"

import { db } from "../firebase-config"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"

export default function Home() {
    const [newArrivals, setNewArrivals] = useState([])
    const [bestSellers, setBestSellers] = useState([])
    const [showProducts, setShowProducts] = useState({ newArrivals: true, bestSellers: true })

    useEffect(() => {
        async function fetchProducts() {
            const qBest = query(collection(db, "products"), orderBy("purchased", "desc"), limit(2))
            const qNew = query(collection(db, "products"), orderBy("updatedAt", "desc"), limit(10))
            let resBest = await getDocs(qBest)
            let resNew = await getDocs(qNew)
            resNew = resNew.docs.filter(doc => !resBest.docs.map(doc => doc.id).includes(doc.id))
            setBestSellers(resBest.docs.map(doc => doc.data()))
            setNewArrivals(resNew.map(doc => doc.data()))
        }
        fetchProducts()
    }, [])

    return (
        <>
            {console.log(newArrivals)}
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
            <div className="container">
                <div className="row g-0">
                    <div className="d-flex flex-wrap justify-content-center mt-5 filter-button-group">
                        <button type="button" className={`btn m-2 text-dark${showProducts.bestSellers && showProducts.newArrivals && " btn-primary"}`} onClick={(e) => setShowProducts({ bestSellers: true, newArrivals: true })}>All</button>
                        <button type="button" className={`btn m-2 text-dark${showProducts.bestSellers && !showProducts.newArrivals && " btn-primary"}`} onClick={(e) => setShowProducts({ bestSellers: true, newArrivals: false })} >Best Sellers</button>
                        <button type="button" className={`btn m-2 text-dark${!showProducts.bestSellers && showProducts.newArrivals && " btn-primary"}`} onClick={(e) => setShowProducts({ bestSellers: false, newArrivals: true })} >New Arrival</button>
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
            </div >
        </>
    )
}