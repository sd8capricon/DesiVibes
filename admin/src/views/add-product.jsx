import { useState, useRef } from "react"
import { Container, Row, Form, FormGroup, Label, Input, Button, Badge, Col, Table, } from "reactstrap"
import Header from "components/Headers/Header"

export default function AddProuct() {
    const [newColor, setNewColor] = useState()
    const [newSize, setNewSize] = useState()
    const [colors, setColors] = useState([])
    const [sizes, setSize] = useState([])
    const [variants, setVariants] = useState([])

    const addColor = (e) => {
        e.preventDefault()
        if (colors.includes(newColor)) alert("color already exists")
        else {
            setColors([...colors, newColor])
            if (sizes.length != 0) {
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
    }

    const addSize = (e) => {
        e.preventDefault()
        if (sizes.includes(newSize)) alert("size already exists")
        else {
            setSize([...sizes, newSize])
            if (colors.length != 0) {
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
    }

    const mapBadges = (color, index, removeFn) => {
        const handleRemoval = (e) => removeFn(e, index)
        return (
            <Badge key={index} color="primary" className="mb-2 mx-1" style={{ fontSize: "15px" }}>
                {color} <Button className="px-1 py-1 ml-2" onClick={handleRemoval}><i className="ni ni-fat-remove" /></Button>
            </Badge>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: add product to db
        // TODO: add images to storage
    }

    const mapVariants = (variant, index) => {
        const handleInventoryChange = (e) => {
            variant.inventory = e.target.value
            setVariants([...variants])
        }
        return (
            <tr key={index}>
                <td>{variant.color}</td>
                <td>{variant.size}</td>
                <td><Input type="number" name="inventory" value={variant.inventory} onChange={handleInventoryChange} /></td>
            </tr>
        )
    }

    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <div className="col">
                        <Form>
                            <FormGroup>
                                <Label for="name" >Name</Label>
                                <Input type="text" name="name" placeholder="product name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender" >For</Label>
                                <Input type="select" name="gender">
                                    <option>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="category" >Category</Label>
                                <Input type="select" name="category">
                                    <option>select category</option>
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
                                <Input type="textarea" name="description" placeholder="product description" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="colors" >Colors</Label><br />
                                {colors.map((color, index) => mapBadges(color, index, removeColor))}
                                <Input className="mb-1" type="text" name="color" onChange={(e) => setNewColor(e.target.value)} />
                                <Button onClick={addColor}>Add Color</Button>
                            </FormGroup>
                            <FormGroup>
                                <Label for="sizes" >Sizes</Label><br />
                                {sizes.map((size, index) => mapBadges(size, index, removeSize))}
                                <Input className="mb-1" type="text" name="size" onChange={(e) => setNewSize(e.target.value)} />
                                <Button onClick={addSize}>Add Size</Button>
                            </FormGroup>
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
                                <Label>Images</Label>
                                <Input type="file" accept="image/*" name="images" multiple />
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </div>
                </Row>
            </Container>
        </>
    )
}