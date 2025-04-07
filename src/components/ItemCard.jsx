import CardIMG from '../assets/test.avif';

export function ItemCard(props) {

    return (
        <div className="item-card">
            <div className="item-card__img"><img src={CardIMG} alt="Item image" /></div>
            <div className="item-card__info">
                <h3 className="item-card__title">Арбуз</h3>
                <p className="item-card__weight-info">
                    <span className="item-card__weight">900</span>
                    <span className="item-card__weight-valute">гр.</span>
                </p>
                <div className="item-card__price-container">
                    <p className="item-card__price-info item-card__price-sale-info">
                        <span className="item-card__price">10452</span>
                        <span className="item-card__price-valute">руб.</span>
                    </p>
                    <p 
                        className="item-card__price-info"
                        style={{textDecoration: "line-through"}}
                    >
                        <span className="item-card__price">10452</span>
                        <span className="item-card__price-valute">руб.</span>
                    </p>
                </div>
            </div>
        </div>
    )
}