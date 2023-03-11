import { useEffect, useState } from "react";
import EmptyHeader from "components/Headers/EmptyHeader";
import { useParams } from "react-router-dom"; import { Container, Row, Form, FormGroup, Label, Input, Button, Badge, Table, } from "reactstrap"

import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { db, storage } from "../firebase-config";

export default function EditProduct() {
    const product_id = useParams()
    const docRef = doc(db, "products", product_id.id);

    let [product, setProduct] = useState()
    const [newColor, setNewColor] = useState()
    const [colors, setColors] = useState([])

    const [newSize, setNewSize] = useState()
    const [sizes, setSize] = useState([])

    let [variants, setVariants] = useState([])
    const [dbImages, setDbImages] = useState([])
    const [removedImages, setRemovedImages] = useState([])
    const [newImages, setNewImages] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            const res = await getDoc(docRef)
            setProduct(res.data())
            setColors(res.data().colors)
            setSize(res.data().sizes)
            setVariants(res.data().variants)
            setDbImages(res.data().images)
        }
        fetchProduct()
    }, [])

    const ImgPreview = ({ fn, src }) => {
        return (
            <div className="col-md-2 mx-3 pl-0">
                <span className="position-relative">
                    <Button className="px-1 mt-2 py-1 ml-2 position-absolute" style={{ right: 0 }} onClick={fn}><i className="ni ni-fat-remove" /></Button>
                    <img style={{ width: "180px" }} src={src} />
                </span>
            </div>
        )
    }

    const addColor = (e) => {
        e.preventDefault()
        if (colors.includes(newColor)) alert("color already exists")
        else if (newColor === '') alert("color cannot be empty")
        else {
            setColors([...colors, newColor])
            if (sizes.length !== 0) {
                sizes.forEach(size => {
                    variants.push({ color: newColor, size, inventory: 0 })
                })
                setVariants(variants)
            }
        }
    }

    const removeColor = (e, index) => {
        e.preventDefault()
        colors.splice(index, 1)
        setColors([...colors])
        variants = variants.filter(variant => variant.color === colors[index])
        setVariants(variants)
    }

    const addSize = (e) => {
        e.preventDefault()
        if (sizes.includes(newSize)) alert("size already exists")
        else if (newSize === '') alert("size cannot be empty")
        else {
            setSize([...sizes, newSize])
            if (colors.length !== 0) {
                colors.forEach(color => {
                    variants.push({ color, size: newSize, inventory: 0 })
                })
                setVariants(variants)
            }
        }
    }

    const removeSize = (e, index) => {
        e.preventDefault()
        sizes.splice(index, 1)
        setSize([...sizes])
        variants = variants.filter(variant => variant.size === sizes[index])
        setVariants(variants)
    }

    const mapBadges = (color, index, removeFn) => {
        const handleRemoval = (e) => removeFn(e, index)
        return (
            <Badge key={index} color="primary" className="mb-2 mx-1" style={{ fontSize: "15px" }}>
                {color} <Button className="px-1 py-1 ml-2" onClick={handleRemoval}><i className="ni ni-fat-remove" /></Button>
            </Badge>
        )
    }

    const mapVariants = (variant, index) => {
        const handleInventoryChange = (e) => {
            variant.inventory = Number(e.target.value)
            setVariants([...variants])
        }
        return (
            <tr key={index}>
                <td>{variant.color}</td>
                <td>{variant.size}</td>
                <td><Input type="number" style={{ width: "20%" }} name="inventory" defaultValue={variant.inventory} onChange={handleInventoryChange} /></td>
            </tr>
        )
    }

    const handleUpload = (e) => {
        e.preventDefault()
        const inputImages = e.target.files
        for (let i = 0; i < inputImages.length; i++) {
            const img = new Image()
            img.src = URL.createObjectURL(inputImages[i])
            img.onload = () => {
                if (img.width === 500 && img.height === 500) {
                    newImages.push(inputImages[i])
                    setNewImages([...newImages])
                }
                else {
                    setNewImages([])
                    alert(inputImages[i].name + " is not valid. Please upload images of size 500x500")
                }
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (e.target.gender.value === "") {
            return alert("Please Select a gender")
        }
        if (e.target.gender.value === "") {
            return alert("Please Select a category")
        }
        if (colors.length === 0) {
            return alert("Please add atleast one color")
        }
        if (sizes.length === 0) {
            return alert("Please add atleast one size")
        }
        product = {
            name: e.target.name.value,
            price: Number(e.target.price.value),
            description: e.target.description.value,
            category: e.target.category.value,
            gender: e.target.gender.value,
            colors: colors,
            sizes: sizes,
            variants: variants
        }
        if (removedImages.length !== 0) {
            for (let i = 0; i < removedImages.length; i++) {
                const imgRef = ref(storage, removedImages[i])
                await deleteObject(imgRef)
            }
            product.images = arrayRemove(...removedImages)
        }

        await updateDoc(docRef, product)
        const newImageRefs = []
        if (newImages.length !== 0) {
            for (let i = 0; i < newImages.length; i++) {
                const imgRef = ref(storage, `${docRef.id}/${newImages[i].name}`)
                await uploadBytes(imgRef, newImages[i])
                newImageRefs.push(await getDownloadURL(imgRef))
            }
            await updateDoc(docRef, { images: arrayUnion(...newImageRefs) })
        }
        window.location = '/'
    }

    if (!product) return <h1>Loading...</h1>
    return (
        <>
            <EmptyHeader />
            <div className="bg-gradient-info d-none d-md-block" style={{ height: "13vh" }}></div>
            <Container className="mt-3" fluid>
                <h2 className="d-md-none mb-3">Edit Product</h2>
                <Row>
                    <div className="col">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name" >Product Title</Label>
                                <Input type="text" name="name" placeholder="product name" defaultValue={product.name} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" >Price</Label>
                                <Input type="number" name="price" placeholder="product price" defaultValue={product.price} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender" >For</Label>
                                <Input type="select" name="gender" defaultValue={product.gender} placeholder="Select Gender">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="category" >Category</Label>
                                <Input type="select" name="category" defaultValue={product.category}>
                                    <option value="">select category</option>
                                    <option value="shirts">shirts</option>
                                    <option value="t-shirts">t-shirts</option>
                                    <option value="jeans">jeans</option>
                                    <option value="sweatshirts">sweatshirts</option>
                                    <option value="hoodies">hoodies</option>
                                    <option value="jackets">jackets</option>
                                    <option value="sportswears">sportswears</option>
                                    <option value="blazers">blazers</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Product Description</Label>
                                <Input type="textarea" name="description" defaultValue={product.description} placeholder="product description" required />
                            </FormGroup>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Label for="colors" >Colors</Label><br />
                                        {colors.map((color, index) => mapBadges(color, index, removeColor))}
                                        <Input className="mb-1" type="text" name="color" onChange={(e) => setNewColor(e.target.value)} />
                                        <Button onClick={addColor} >Add Color</Button>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup>
                                        <Label for="sizes" >Sizes</Label><br />
                                        {sizes.map((size, index) => mapBadges(size, index, removeSize))}
                                        <Input className="mb-1" type="text" name="size" onChange={(e) => setNewSize(e.target.value)} />
                                        <Button onClick={addSize}>Add Size</Button>
                                    </FormGroup>
                                </div>
                            </Row>
                            <FormGroup>
                                <Label for="variants">Variants</Label>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Inventory</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {variants.map(mapVariants)}
                                    </tbody>
                                </Table>
                            </FormGroup>
                            <FormGroup>
                                <Label>Select/Delete Images to diplay on product page <small>only 500x500 accepted</small></Label>
                                <Input type="file" accept="image/*" name="images" multiple onChange={handleUpload} />
                                <Container fluid>
                                    <Row className="justify-content-start">
                                        {dbImages &&
                                            dbImages.map((image, index) => {
                                                const removeDbImages = (e) => {
                                                    e.preventDefault()
                                                    dbImages.splice(index, 1)
                                                    setDbImages([...dbImages])
                                                    setRemovedImages([...removedImages, image])
                                                }
                                                return <ImgPreview key={index} fn={removeDbImages} src={image} />
                                            })
                                        }
                                        {newImages &&
                                            newImages.map((image, index) => {
                                                const removeNewImages = (e) => {
                                                    e.preventDefault()
                                                    newImages.splice(index, 1)
                                                    setNewImages([...newImages])
                                                }
                                                return <ImgPreview key={index} fn={removeNewImages} src={URL.createObjectURL(image)} />
                                            })
                                        }
                                    </Row>
                                </Container>
                            </FormGroup>
                            <Button>Edit Product</Button>
                        </Form>
                    </div>
                </Row>
            </Container>
        </>
    )
}