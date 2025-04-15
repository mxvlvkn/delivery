import LogoIMG from '../assets/logo_white.png';
import CartIcon from '../assets/cart.png';

export function Header() {

    return (
        <header className="header">
            <div className="header__top">
                <div className="content">
                    <div className="header__left">
                        <div className="header__logo">
                            <img src={LogoIMG} alt="Logo"/>
                        </div>
                    </div>
                    <div className="header__right">
                        <div className="header__contacts">
                            <div className="header__phone"><a href="tel:+79999999999">+7 (999) 999-99-99</a></div>
                            <div className="header__address"><a href="https://example.com">ул. Пушкина, д. Колотушкина</a></div>
                        </div>
                        <div className="header__cart">
                            <div className="header__cart-icon">
                                <img src={CartIcon}alt="Cart" />
                            </div>
                            <div className="header__cart-counter-wrapper"><p className="header__cart-counter">52</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}