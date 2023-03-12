export default function ProductPreview({ product }) {
    return (
        <a href={`/product/${product.id}`} className="product-preview col-12 col-md-3 px-4">
            <img className="img-fluid border" src={product.images[0]} alt="" />
            <div className="text-center mt-2">
                <span>{product.name}</span>
                <p className="fw-bold">₹ {product.price}</p>
            </div>
        </a>
    )
}