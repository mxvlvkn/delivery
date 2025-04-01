import ColorService from "../services/ColorService.js"

export function Popup(props) {
  return (
    <div 
        className={`popup ${(props.status) ? '' : '_hidden'}`} 
        style={{
            backgroundColor: (props.isBgr) ? ColorService.getColorWithOpacity(0.3) : ColorService.getColorWithOpacity(0),
        }}
        onClick={() => {props.setStatus(false)}}
    >
        <div 
            className={"popup__container " + props.className}
            onClick={(event) => {event.stopPropagation()}}
        >
            <button 
                type="button" 
                className="popup__btn"
                onClick={() => {props.setStatus(false)}}
            >
                <span className="popup__btn-l popup__btn-l-1"></span><span className="popup__btn-l popup__btn-l-2"></span>
            </button>
            {props.children}
        </div>
    </div>
  )
}