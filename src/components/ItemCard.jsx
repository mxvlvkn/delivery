import CardIMG from '../assets/test.avif';
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export function ItemCard({
    product
}) {

    return (
        <div className="item-card">
            <div className="item-card__img"><img src={SERVER_HOST + product.image} alt="Item image" /></div>
            <div className="item-card__info">
                <h3 className="item-card__title">{(product.name.length > 25) ? (product.name.substring(0, 25).trim() + '...') : product.name}</h3>
                <p className="item-card__weight-info">
                    <span className="item-card__weight">{product.weight}</span>
                    <span className="item-card__weight-valute">гр.</span>
                </p>
                <div className="item-card__price-container">
                    <p className="item-card__price-info item-card__price-sale-info">
                        {product.isSale && <>
                            <span className="item-card__price">{product.salePrice}</span>
                            <span className="item-card__price-valute">руб.</span>
                        </>}
                    </p>
                    <p 
                        className="item-card__price-info"
                        style={
                            product.isSale
                            ?
                                {textDecoration: "line-through"}
                            :
                                {}
                        }
                    >
                        <span className="item-card__price">{product.price}</span>
                        <span className="item-card__price-valute">руб.</span>
                    </p>
                </div>
            </div>
        </div>
    )
}