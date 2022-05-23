import { useSelector } from "react-redux";

const BookView = () => {
    const books = useSelector(state => state.books.value);
    const selectedIndex = useSelector(state => state.selection.index);

    const book = books[selectedIndex];

    return (
        <div className="book-view">
            { book ? 
                <>
                    <h1>{book.title}</h1>
                    <span>{book.author}</span>
                    <div>
                        <input type="radio" id="at_home" name="status" />
                        <label htmlFor="at_home">At home</label>
                    </div>
                    <div>
                        <input type="radio" id="away" name="status" />
                        <label htmlFor="away">Away</label>
                    </div>
                </>
            : ''}
        </div>
    )
}

export default BookView;