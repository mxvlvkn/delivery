

export function Popup(props) {
  return (
    <div 
        className={`popup ${(props.status) ? '' : '_hidden'}`} 
        style={{
            backgroundColor: (props.isBgr) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.0)',
        }}
        onClick={() => {
            props.setStatus(false);
            if (props.closeHandle) {
                props.closeHandle();
            }
        }}
    >
        <div 
            className={"popup__container " + props.className}
            onClick={(event) => {event.stopPropagation()}}
        >
            <button 
                type="button" 
                className="popup__btn"
                onClick={() => {
                    props.setStatus(false);
                    if (props.closeHandle) {
                        props.closeHandle();
                    }
                }}
            >
                <span className="popup__btn-l popup__btn-l-1"></span><span className="popup__btn-l popup__btn-l-2"></span>
            </button>
            {props.children}
        </div>
    </div>
  )
}