export function Post(props) {

    return (
        <div className="post__container">
            <h2 className="post__title">{props.title}</h2>
            <p className="post__text">{props.text}</p>
        </div>
    )
}