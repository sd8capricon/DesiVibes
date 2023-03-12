import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Media,
    Table
} from "reactstrap";
import EmptyHeader from "components/Headers/EmptyHeader";

import { db, storage } from "../firebase-config"
import { collection, doc, getDocs, updateDoc, deleteDoc, query, orderBy, limit, startAfter, endBefore, limitToLast } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage";

export default function Products() {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState()
    const collectionRef = collection(db, "products")
    const pageLimit = 5
    let [page, setPage] = useState(1)

    useEffect(() => {
        async function fetchProducts() {
            const q = query(collectionRef, orderBy("name"), limit(pageLimit))
            let res = await getDocs(q)
            setProducts(res.docs.map(doc => doc.data()))
        }
        fetchProducts()
    }, [])

    const nextPage = async () => {
        const last = products[products.length - 1]
        const q = query(collectionRef, orderBy("name"), startAfter(last.name), limit(pageLimit))
        let res = await getDocs(q)
        if (res.docs.length === 0) {
            return alert("No more products")
        }
        setPage(page + 1)
        setProducts(res.docs.map(doc => doc.data()))
    }

    const prevPage = async () => {
        const first = products[0]
        const q = query(collectionRef, orderBy("name"), endBefore(first.name), limitToLast(pageLimit))
        let res = await getDocs(q)
        setPage(page - 1)
        setProducts(res.docs.map(doc => doc.data()))
    }

    if (!products) {
        return <div>Loading...</div>
    }
    return (
        <>
            <EmptyHeader />
            <Container className="mt-3" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex justify-content-between">
                                <h3 className="mb-0">Products</h3>
                                <a className="btn btn-success" style={{ fontSize: "12px" }} href="/admin/add-product">Add New Product</a>
                            </CardHeader>
                            <Table className="align-items-center" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Product Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Sizes</th>
                                        <th scope="col">Colors</th>
                                        <th scope="col">Total Inventory</th>
                                        <th scope="col">Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => <ProductRow key={index} product={product} />)}
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className={page === 1 ? "disabled" : ""}>
                                            <PaginationLink
                                                href=""
                                                onClick={prevPage}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href=""
                                                onClick={nextPage}
                                            >
                                                <i className="fas fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>

        </>
    );
}

const ProductRow = ({ product }) => {
    const docRef = doc(db, "products", product.id)

    const deleteProduct = async () => {
        await deleteDoc(docRef)
        product.images.forEach(async (image) => {
            const imageRef = ref(storage, image)
            await deleteObject(imageRef)
        })
        window.location.reload()
    }

    const removeFeatured = async () => {
        await updateDoc(docRef, {
            featured: false
        })
        window.location.reload()
    }

    const addToFeatured = async () => {
        await updateDoc(docRef, {
            featured: true
        })
        window.location.reload()
    }

    return (
        <tr>
            <th scope="row">
                <Media className="align-items-center">
                    <a className="avatar rounded-circle mr-3" href={`/admin/edit-product/${product.id}`} target="_blank">
                        <img src={product.images[0]} />
                    </a>
                    <Media>
                        <span className="mb-0 text-sm">{product.name}</span>
                    </Media>
                </Media>
            </th>
            <td>₹{product.price}</td>
            <td>
                {product.sizes.map((size, index) => `${size}${index === product.sizes.length - 1 ? "" : ", "}`)}
            </td>
            <td>
                {product.colors.map((color, index) => `${color}${index === product.colors.length - 1 ? "" : ", "}`)}
            </td>
            <td>{product.totalInventory}</td>
            <td >
                <a className="btn btn-primary" style={{ fontSize: "12px" }} href={`/admin/edit-product/${product.id}`} target="_blank">Edit</a>
                <Button style={{ fontSize: "12px" }} color="danger" onClick={deleteProduct}>Delete</Button>
                {product.featured ?
                    <Button style={{ fontSize: "12px" }} color="success" onClick={removeFeatured}> Featured</Button> :
                    <Button style={{ fontSize: "12px" }} color="warning" onClick={addToFeatured}> Not Featured</Button>
                }
            </td>
        </tr >
    )
}