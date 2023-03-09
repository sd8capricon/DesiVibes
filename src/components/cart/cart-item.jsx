export default function CartItem({ index, product, increment, decrement }) {
    const handleIncrement = () => {
        increment(index)
    }

    const handleDecrement = () => {
        decrement(index)
    }

    return (
        <li className="list-group-item d-flex justify-content-between lh-sm">
            <div className="cart">
                <h6 className="my-0">{product.product_name}</h6>
                <small className="text-muted">Size: {product.size}, Color: {product.color}</small>
                <div className="quantity-control">
                    <div className="side-btn">
                        <button onClick={handleDecrement} className="btn btn-primary">
                            <i className="bi bi-dash"></i>
                        </button>
                    </div>
                    <input type="text" value={product.quantity} style={{ textAlign: 'center' }} disabled />
                    <div className="side-btn">
                        <button onClick={handleIncrement} className="btn btn-primary">
                            <i className="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <span className="text-muted">${product.price_per_unit * product.quantity}</span>
        </li>
    )
}