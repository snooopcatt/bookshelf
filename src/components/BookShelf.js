import { useReducer } from "react";
import { useSelector } from "react-redux";
import Book from "./Book";

const selection = {
    selectedIndex: -1
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'select':
            return { selectedIndex: action.value }
        default:
            throw new Error();
    }
}

const BookShelf = () => {
    const books = useSelector(state => state.books.value);
    const [state, dispatch] = useReducer(reducer, selection);

    return (
        <div className="book-shelf">
            {books.map((book, i) => 
                <Book 
                    key={i}
                    book={book}
                    selected={i === state.selectedIndex}
                    onClick={() => {
                        dispatch({ type: 'select', value: i })
                    }}
                />)}
        </div>
    );
}

export default BookShelf;
