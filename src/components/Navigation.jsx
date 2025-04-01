import {useContext} from 'react'
import {ColorContext} from '../providers/ColorProvider.jsx'
import ColorService from '../services/ColorService.js'

export function Navigation() {
    const {color, setColor} = useContext(ColorContext)

    return (
        <nav className="nav">
            <div className="nav__container" style={{borderBottom: ColorService.getBorderBottom(color.color)}}>
                <button className="nav__news text-active">Новости</button>
                <button className="nav__news text-active">Чат</button>
            </div>
        </nav>
    )
}