import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "./Book";
import { select } from "../data/selectionSlice";

const BookShelf = () => {
    console.log('render');
    const books = useSelector(state => state.books.value);
    const selectedIndex = useSelector(state => state.selection.index);
    const dispatch = useDispatch();

    const shelfRef = useRef(null);

    useEffect(() => {
        const keyDownHandler = ({ key }) => {
            console.log(key);
            switch (key) {
                case 'ArrowDown':
                    dispatch(select(Math.min(selectedIndex + 1, books.length - 1)));
                    break;
                case 'ArrowUp':
                    dispatch(select(Math.max(selectedIndex - 1, 0)));
                    break;
                default:
                    break;
            }
        }

        const el = shelfRef.current;

        el.addEventListener('keydown', keyDownHandler);

        return () => {
            el.removeEventListener('keydown', keyDownHandler);
        }
    });

    return (
        <div ref={shelfRef} className="book-shelf" tabIndex="0">
            {books.map((book, i) => 
                <Book 
                    key={i}
                    book={book}
                    selected={i === selectedIndex}
                    onClick={() => {
                        dispatch(select(i))
                    }}
                />
                )}
        </div>
    );
}

export default BookShelf;
