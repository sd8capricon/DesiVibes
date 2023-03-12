import { useEffect, useState } from 'react'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ProductPreview from "../components/home/product-peview"

import { db } from '../firebase-config'
import { getDocs, collection, startAfter, endBefore, limitToLast, query, orderBy, limit } from 'firebase/firestore'

export default function shop() {
    const pageLimit = 3
    const collectionRef = collection(db, "products")
    const [products, setProducts] = useState([])
    let [colors, setColors] = useState([])
    let [sizes, setSizes] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [page, setPage] = useState(1)

    const updateColors = (products) => {
        products.forEach((product, index) => {
            product.colors.forEach((color, index) => {
                const exists = colors.find((c) => c.value === color)
                if (!exists)
                    colors.push({ checked: false, value: color })
            })
        })
        setColors(colors)
    }

    const updateSizes = (products) => {
        products.forEach((product, index) => {
            product.sizes.forEach((size, index) => {
                const exists = sizes.find((s) => s.value === size)
                if (!exists)
                    sizes.push({ checked: false, value: size })
            })
        })
        setSizes(sizes)
    }

    useEffect(() => {
        async function fetchProducts() {
            const q = query(collectionRef, orderBy("name"), limit(pageLimit))
            const res = await getDocs(q)
            const data = res.docs.map(doc => doc.data())
            updateColors(data)
            updateSizes(data)
            setProducts(data)

        }
        fetchProducts()

    }, [])

    const nextPage = async (e) => {
        e.preventDefault()
        const last = products[products.length - 1]
        const q = query(collectionRef, orderBy("name"), startAfter(last.name), limit(pageLimit))
        let res = await getDocs(q)
        if (res.docs.length === 0) {
            return alert("No more products")
        }
        setPage(page + 1)
        const data = res.docs.map(doc => doc.data())
        updateColors(data)
        updateSizes(data)
        setProducts(data)
    }

    const prevPage = async () => {
        e.preventDefault()
        const first = products[0]
        const q = query(collectionRef, orderBy("name"), endBefore(first.name), limitToLast(pageLimit))
        let res = await getDocs(q)
        setPage(page - 1)
        const data = res.docs.map(doc => doc.data())
        updateColors(data)
        updateSizes(data)
        setProducts(data)
    }

    const CheckBoxes = ({ index, name, value, checked }) => {
        const handleCheck = (e) => {
            if (e.target.checked) {
                let temp = []
                if (name === "color") {
                    temp = products.filter(product => product.colors.includes(value))
                    colors[index].checked = true
                }
                else if (name === "size") {
                    temp = products.filter(product => product.sizes.includes(value))
                    sizes[index].checked = true
                }
                setColors(colors)
                setFilteredProducts([...filteredProducts, ...temp])
            }
            else {
                let temp = []
                if (name === "color") {
                    temp = filteredProducts.filter(product => !product.colors.includes(value))
                    colors[index].checked = false
                }
                else if (name === "size") {
                    temp = filteredProducts.filter(product => !product.sizes.includes(value))
                    sizes[index].checked = false
                }
                setColors(colors)
                setFilteredProducts(temp)
            }
        }
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={value} name={name} onChange={handleCheck} checked={checked} />
                <label className="form-check-label" htmlFor={name}>{value}</label>
            </div >
        )
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Shop</h1>
            </div>
            <section className='container mt-4'>
                <div className="row">
                    <div className="col-2">
                        <h4>Filter by Color</h4>
                        <div className="form-check">
                            {colors.map((color, index) => (
                                <CheckBoxes key={index} index={index} name="color" value={color.value} checked={color.checked} />
                            ))}
                        </div>
                        <h4 className="mt-4">Filter by Size</h4>
                        <div className="form-check">
                            {sizes.map((size, index) => (
                                <CheckBoxes key={index} index={index} name="size" value={size.value} checked={size.checked} />
                            ))}
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            {
                                filteredProducts.length > 0 ?
                                    filteredProducts.map((product, index) => (
                                        <ProductPreview key={index} product={product} />
                                    )) :
                                    products.map((product, index) => (
                                        <ProductPreview key={index} product={product} />
                                    ))
                            }

                        </div>
                        <ul className="pagination justify-content-end">
                            <li className={`page-item${page === 1 ? " disabled" : ""}`}><a className="page-link" href="" onClick={prevPage}>Previous</a></li>
                            <li className="page-item"><a className="page-link" href="" onClick={nextPage}>Next</a></li>
                        </ul>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    )
}