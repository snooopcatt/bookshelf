const Book = props => {
    return (
        <div
            data-index={props.index}
            className={`book-item ${props.selected ? 'selected' : ''}`}
            onClick={props.onClick}
        >
            <div className="book-title">{props.book.title}</div>
            <div className="book-author">{props.book.author}</div>
        </div>
    )
};

export default Book;