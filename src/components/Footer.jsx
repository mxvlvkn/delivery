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

export function Footer() {
    const [hoverStatus, setHoverStatus] = useState(false);

  return (
    <footer className="footer">
        <div className="footer__top">
            <div className="content">
                <div className="footer__left">
                    <div className="footer__logo">
                        <img src={LogoIMG} alt="Logo"/>
                    </div>
                </div>
                <div className="footer__right">
                    <div className="footer__contacts">
                        <div className="footer__phone"><a href="tel:+79999999999">+7 (999) 999-99-99</a></div>
                        <div className="footer__address"><a href="https://example.com">ул. Пушкина, д. Колотушкина</a></div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}