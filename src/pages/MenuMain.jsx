import React, {useContext} from 'react'
import {Header} from '../components/Header.jsx'
import { Navigation } from '../components/Navigation.jsx'
import { ItemCard } from '../components/ItemCard.jsx'

export function MenuMain() {
    return (<>
        <body>
            <div className="content">
                <h1 className="menu-main__title">МЕНЮ</h1>
                <h2 className="menu-main__category-title">КАТЕГОРИЯ ЕДЫ</h2>
                <span className="menu-main__category-line"></span>
                <div className="menu-main__item-cards">
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                </div>
                <h2 className="menu-main__category-title">КАТЕГОРИЯ ЕДЫ</h2>
                <span className="menu-main__category-line"></span>
                <div className="menu-main__item-cards">
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                </div>
            </div>
        </body>
    </>)
}