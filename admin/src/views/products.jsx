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
import { collection, doc, getDocs, getDoc, deleteDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage";

export default function Products() {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState()
    // const docRef = doc(db, "products", "JSJzOdYikWvUem2tkpSw")
    const collectionRef = collection(db, "products")

    useEffect(() => {
        async function fetchProducts() {
            // let res = await getDoc(docRef)
            // setProduct(res.data())
            // console.log(res.data())
            let res = await getDocs(collectionRef)
            setProducts(res.docs.map(doc => doc.data()))
        }
        fetchProducts()
    }, [])

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
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                2 <span className="sr-only">(current)</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
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

    const deleteProduct = async () => {
        const docRef = doc(db, "products", product.id)
        await deleteDoc(docRef)
        product.images.forEach(async (image) => {
            const imageRef = ref(storage, image)
            await deleteObject(imageRef)
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
            </td>
        </tr>
    )
}