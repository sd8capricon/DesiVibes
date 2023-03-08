import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase-config"
import { useAuth } from "../contexts/AuthContext"
import { collection, doc, endAt, getDoc, getDocs, orderBy, query, startAt, updateDoc, where } from 'firebase/firestore'

import Navbar from "../components/Navbar"
import RadioInput from "../components/product/radio-input"

export default function Product({ children }) {
    const [product, setProduct] = useState()
    const [size, setSize] = useState()
    const [color, setColor] = useState()
    const [quantity, setQuantity] = useState(1)
    const product_id = useParams()
    const { currentUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        setColor(form.color.value)
        setSize(form.size.value)

        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const res = await getDoc(docRef)
            let cart = res.data().cart
            cart = [...cart, { product_id: product_id.id, size: form.size.value, color: form.color.value, quantity: quantity }]
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
                                <form onSubmit={handleSubmit}>
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

            </>
        )
    } else {
        return (
            <h1>Product not found</h1>
        )
    }
}