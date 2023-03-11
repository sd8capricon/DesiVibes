import { useState } from "react"
import { Container, Row, Form, FormGroup, Label, Input, Button, Badge, Table, } from "reactstrap"

import { db, storage } from "firebase-config"
import { addDoc, collection, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function AddProuct() {
    const [newColor, setNewColor] = useState()
    const [colors, setColors] = useState([])

    const [newSize, setNewSize] = useState()
    const [sizes, setSize] = useState([])

    let [variants, setVariants] = useState([])
    const [images, setImages] = useState([])

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

    const handleUpload = (e) => {
        e.preventDefault()
        const inputImages = e.target.files
        for (let i = 0; i < inputImages.length; i++) {
            const img = new Image()
            img.src = URL.createObjectURL(inputImages[i])
            img.onload = () => {
                if (img.width === 500 && img.height === 500) {
                    images.push(inputImages[i])
                    setImages([...images])
                }
                else {
                    setImages([])
                    alert(inputImages[i].name + " is not valid. Please upload images of size 500x500")
                }
            }
        }
    }

    const removeImage = (e, index) => {
        e.preventDefault()
        images.splice(index, 1)
        setImages([...images])
    }

    const mapVariants = (variant, index) => {
        const handleInventoryChange = (e) => {
            variant.inventory = parseInt(e.target.value)
            setVariants([...variants])
        }
        return (
            <tr key={index}>
                <td>{variant.color}</td>
                <td>{variant.size}</td>
                <td><Input type="number" style={{ width: "20%" }} name="inventory" value={variant.inventory} onChange={handleInventoryChange} /></td>
            </tr>
        )
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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

        let product = {
            name: e.target.name.value,
            price: Number(e.target.price.value),
            description: e.target.description.value,
            category: e.target.category.value,
            gender: e.target.gender.value,
            colors: colors,
            sizes: sizes,
            variants: variants
        }
        const docRef = await addDoc(collection(db, "products"), product)
        const imageRefs = []
        for (let i = 0; i < images.length; i++) {
            const storageRef = ref(storage, `${docRef.id}/${images[i].name}`)
            await uploadBytes(storageRef, images[i])
            await getDownloadURL(storageRef).then((url) => {
                console.log(url);
                imageRefs.push(url)
            })
        }
        await updateDoc(docRef, { images: imageRefs })
        console.log(docRef.id)
        window.location.href = "/admin/products"
    }

    return (
        <>
            <div className="bg-gradient-info d-none d-md-block" style={{ height: "13vh" }}></div>
            <Container className="mt-3" fluid>
                <h2 className="d-md-none mb-3">Add Product</h2>
                <Row>
                    <div className="col">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name" >Product Title</Label>
                                <Input type="text" name="name" placeholder="product name" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" >Price</Label>
                                <Input type="number" name="price" placeholder="product price" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender" >For</Label>
                                <Input type="select" name="gender" placeholder="Select Gender">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="category" >Category</Label>
                                <Input type="select" name="category">
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
                                <Input type="textarea" name="description" placeholder="product description" required />
                            </FormGroup>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Label for="colors" >Colors</Label><br />
                                        {colors.map((color, index) => mapBadges(color, index, removeColor))}
                                        <Input className="mb-1" type="text" name="color" onChange={(e) => setNewColor(capitalizeFirstLetter(e.target.value))} />
                                        <Button onClick={addColor}>Add Color</Button>
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
                                        {variants.map((variant, index) => mapVariants(variant, index))}
                                    </tbody>
                                </Table>
                            </FormGroup>
                            <FormGroup>
                                <Label>Select Images to diplay on product page <small>only 500x500 accepted</small></Label>
                                <Input type="file" accept="image/*" name="images" multiple onChange={handleUpload} required />
                                <Container fluid>
                                    <Row className="justify-content-start">
                                        {images &&
                                            images.map((image, index) => {
                                                const fn = (e) => removeImage(e, index)
                                                const src = URL.createObjectURL(image)
                                                return <div key={index} className="col-md-2 mr-4">
                                                    <span className="position-relative">
                                                        <Button className="px-1 mt-2 py-1 ml-2 position-absolute" style={{ right: 0 }} onClick={fn}><i className="ni ni-fat-remove" /></Button>
                                                        <img style={{ width: "180px" }} key={index} src={src} alt="" />
                                                    </span>
                                                </div>
                                            })
                                        }
                                    </Row>
                                </Container>
                            </FormGroup>
                            <Button>Add Product</Button>
                        </Form>
                    </div>
                </Row>
            </Container>
        </>
    )
}