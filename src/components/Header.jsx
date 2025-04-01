import LogoIMG from '../assets/logo_white.png';
import CategoryIcon from '../assets/category.png';
import CartIcon from '../assets/cart.png';
import {useContext, useState, useEffect} from 'react'
import {ColorContext} from '../providers/ColorProvider.jsx';
import {AuthContext} from '../providers/AuthProvider.jsx';
import {Logo} from './Logo.jsx';
import { ColorForm } from './ColorForm.jsx';
import FetchService from '../services/FetchService.js';
import InterceptorService from '../services/InterceptorService.js'
import ColorService from '../services/ColorService.js';
import ValidationService from '../services/ValidationService.js';
import { AuthForm } from './AuthForm.jsx';
import { ColorButton } from './ColorButton.jsx';

export function Header() {
    const [hoverStatus, setHoverStatus] = useState(false);

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
        <nav className="header__bottom">
            <div className="content">
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                    <li className="header__nav-item">
                        <div className="header__nav-item-icon">
                            <img src={CategoryIcon} alt="Catecory icon" />
                        </div>
                        <p className="header__nav-item-title">АРБУЗ</p>
                    </li>
                </ul>
            </div>
            
        </nav>
    </header>
  )
}