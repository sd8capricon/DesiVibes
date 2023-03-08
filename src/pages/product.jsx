import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase-config"
import { useAuth } from "../contexts/AuthContext"
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import Navbar from "../components/Navbar"
import RadioInput from "../components/product/radio-input"

export default function Product() {
    const [product, setProduct] = useState()
    const [quantity, setQuantity] = useState(1)
    const product_id = useParams()
    const { currentUser } = useAuth()

    const addToCart = async (e) => {
        e.preventDefault()
        const form = e.target
        setColor(form.color.value)
        setSize(form.size.value)

        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const res = await getDoc(docRef)
            let cart = res.data().cart
            cart = [...cart, { product_id: product_id.id, size: form.size.value, color: form.color.value, quantity: quantity, price: product.price * quantity, price_per_unit: product.price }]
            await updateDoc(docRef, { cart })
        }
        else {
            alert('Please log in to add to cart')
        }
    }

    useEffect(() => {
        const docRef = doc(db, "products", product_id.id);
        async function fetchProduct() {
            const res = await getDoc(docRef)
            console.log(res.data())
            setProduct(res.data())
            // const term = 'Indie'
            // const q = query(collection(db, "products"), orderBy("name"), where("name", ">=", term), where("name", "<", term + "z"))
            // const querySnapshot = await getDocs(q)
            // console.log(querySnapshot);
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            // });
        }
        fetchProduct()
    }, [])

    if (product) {
        return (
            <>
                <Navbar />
                <div className="container-fluid py-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-5 pb-5">
                            <div id="product-carousel" className="carousel carousel-dark slide">
                                <div className="carousel-inner border">
                                    {product.photos.map((image, index) => {
                                        return (
                                            <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                                <img className="w-100 h-100" src={image} alt="Image" />
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#product-carousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#product-carousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-7 pb-5">
                            <h3 className="font-weight-semi-bold">{product.name}</h3>
                            <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
                            <p className="mb-4">{product && product.description}</p>
                            <div className="d-flex mb-3">
                                <form onSubmit={addToCart}>
                                    <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                                    {
                                        product.sizes.map((size, index) => {
                                            return <RadioInput key={index} name="size" id={`size-${index}`} value={size} defaultCheck={index === 0 && true} />
                                        })
                                    }

                                    <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                                    {
                                        product.colors.map((color, index) => {
                                            return <RadioInput key={index} name="color" id={`color-${index}`} value={color} defaultCheck={index === 0 && true} />
                                        })
                                    }

                                    <div className="d-flex">
                                        <div className="side-btn">
                                            <button onClick={(e) => { e.preventDefault(), quantity > 1 && setQuantity(quantity - 1) }} className="btn btn-primary">-</button>
                                        </div>
                                        <input type="text" size={2} value={quantity} style={{ textAlign: 'center' }} disabled />
                                        <div className="side-btn">
                                            <button onClick={(e) => { e.preventDefault(), setQuantity(quantity + 1) }} className="btn btn-primary">+</button>
                                        </div>
                                        <button className="btn btn-primary"><i className=""></i> Add To Cart</button>
                                    </div>
                                </form>
                            </div>

                            <div className="d-flex pt-2">
                                <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                                <div className="d-inline-flex">
                                    <a className="text-dark px-2" href="">
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <i className="bi bi-twitter"></i>
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <i className="bi bi-pinterest"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-5 px-5">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="mb-4">Reviews for {product.name}</h4>
                            <div class="media mb-4">
                                <img src="img/user.jpg" alt="Image" class="img-fluid mr-3 mt-1" style={{ width: "45px;" }} />
                                <div class="media-body">
                                    <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                    <div class="text-primary mb-2">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h4 class="mb-4">Leave a review</h4>
                            <form>
                                <div class="form-group">
                                    <label for="message">Your Review *</label>
                                    <textarea id="message" cols="30" rows="5" class="form-control"></textarea>
                                </div>
                                <div class="form-group mb-0">
                                    <input type="submit" value="Leave Your Review" class="btn btn-primary px-3" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <h1>Product not found</h1>
        )
    }
}