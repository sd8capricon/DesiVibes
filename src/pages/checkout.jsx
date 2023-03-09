import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config"

import Navbar from "../components/Navbar"
import CartItem from "../components/cart/cart-item";
import RadioInput from "../components/product/radio-input"


export default function CheckOut() {
    const { currentUser } = useAuth()
    const [user, setUser] = useState()
    const [total, setTotal] = useState(0)
    const docRef = doc(db, "users", currentUser.uid);

    useEffect(() => {
        const fetchUser = async () => {
            if (currentUser) {
                const res = await getDoc(docRef)
                console.log(res.data())
                setUser(() => {
                    setTotal(calculateTotal(res.data()))
                    return res.data()
                })
            }
        }
        fetchUser()
    }, [])

    const calculateTotal = (user) => {
        let total = 0
        user.cart.forEach(product => {
            total += product.price
        })
        let gst = 0.05 * total // 5% GST
        let shipping = 0.10 * total // 10% Shipping
        total += gst
        total += shipping
        return { gst, shipping, finalCost: total }
    }


    const decrement = async (index) => {
        let cart = user.cart
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1
            cart[index].price -= cart[index].price_per_unit
            await updateDoc(docRef, { cart })
            setUser({ ...user, cart })
            setTotal(calculateTotal(user))
        }
        else if (cart[index].quantity == 1) {
            cart.splice(index, 1)
            await updateDoc(docRef, { cart })
            setUser({ ...user, cart })
            setTotal(calculateTotal(user))
        }
    }


    const increment = async (index) => {
        let cart = user.cart
        cart[index].quantity += 1
        cart[index].price += cart[index].price_per_unit
        await updateDoc(docRef, { cart })
        setUser({ ...user, cart })
        setTotal(calculateTotal(user))
    }

    if (user) {
        return (
            <>
                <Navbar />
                <div className="container">
                    <main>
                        <div className="row g-5">
                            <div className="col-md-5 col-lg-4 order-md-last">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-primary">Your cart</span>
                                    <span className="badge bg-primary rounded-pill">{user.cart.length}</span>
                                </h4>
                                <ul className="list-group mb-3">
                                    {user.cart.length == 0 && <li className="list-group-item d-flex justify-content-between bg-light">
                                        Your cart is empty
                                    </li>}
                                    {user.cart.map((product, index) => {
                                        return <CartItem key={index} index={index} product={product} increment={increment} decrement={decrement} />
                                    })}
                                    {/* <li className="list-group-item d-flex justify-content-between bg-light">
                                    <div className="text-success">
                                        <h6 className="my-0">Promo code</h6>
                                        <small>EXAMPLECODE</small>
                                    </div>
                                    <span className="text-success">−$5</span>
                                </li> */}
                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                        <div>
                                            <h6 className="my-0">Taxes (+5% GST)</h6>
                                        </div>
                                        <span className="text-success">${total.gst}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                        <div>
                                            <h6 className="my-0">Shipping (+10% GST)</h6>
                                        </div>
                                        <span className="text-success">${total.shipping}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total (USD)</span>
                                        <strong>${total.finalCost}</strong>
                                    </li>
                                </ul>

                                <form className="card p-2">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Promo code" />
                                        <button type="submit" className="btn btn-secondary">Redeem</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-7 col-lg-8">
                                <h4 className="mb-3">Billing address</h4>
                                <form className="needs-validation" noValidate="">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label htmlFor="name" className="form-label">Full name</label>
                                            <input type="text" className="form-control" htmlFor="name" id="name" placeholder="First & Last name" required />
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="contact" className="form-label">Contact Number</label>
                                            <input type="contact" className="form-control" id="contact" placeholder="+910123456789" />
                                            <div className="invalid-feedback">
                                                Please enter a valid email address for shipping updates.
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                            <div className="invalid-feedback">
                                                Please enter a valid email address for shipping updates.
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" />
                                            <div className="invalid-feedback">
                                                Please enter your shipping address.
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                                            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                                        </div>

                                        <div className="col-md-5">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <input className="form-control" type="text" name="state" required />
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input className="form-control" type="text" name="city" required />
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="zip" className="form-label">Zip</label>
                                            <input type="text" className="form-control" id="zip" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Zip code required.
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="same-address" />
                                        <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                                    </div>

                                    <hr className="my-4" />

                                    <h4 className="mb-3">Payment</h4>

                                    <div className="my-3">
                                        <RadioInput name="payment" value="Credit Card" /><br />
                                        <RadioInput name="payment" value="UPI" /><br />
                                        <RadioInput name="payment" value="Net Banking" /><br />
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col-md-6">
                                            <label htmlFor="cc-name" className="form-label">Name on card</label>
                                            <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                                            <small className="text-muted">Full name as displayed on card</small>
                                            <div className="invalid-feedback">
                                                Name on card is required
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                            <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Credit card number is required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                            <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Expiration date required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                            <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Security code required
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                                </form>
                            </div>
                        </div>
                    </main >

                    <footer className="my-5 pt-5 text-muted text-center text-small">
                        <p className="mb-1">© 2017–2022 Company Name</p>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="#">Privacy</a></li>
                            <li className="list-inline-item"><a href="#">Terms</a></li>
                            <li className="list-inline-item"><a href="#">Support</a></li>
                        </ul>
                    </footer>
                </div >
            </>
        )
    }
}