import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../data/dataSlice";

const highlight = (textContent, queryBits) => {
    // We want to split text content to parts consisting of substrings not matching
    // the search query and react elements which wrap matching strings
    let result = [textContent];
    // Indexer for list items
    let counter = 1;

    // For every regular expression in list
    for (const re of queryBits) {
        // build new result array from array from the previous step
        // eslint-disable-next-line no-loop-func
        result = result.reduce((result, item) => {
            let matches;

            // Array may contain strings and react elements
            // Regexp uses case-insensitive flag but we want to show exactly the substr we
            // matched. So we store original matches to an array
            if (typeof item === 'string' && (matches = item.match(re))) {
                // Split string by the regular expression, this will result in arrray
                // containing only substrings not matching the regexp
                result.push(...item.split(re).reduce((result, chunk, i, array) => {
                    // Always push substr
                    result.push(chunk);

                    // Last item should not be followed by the match
                    if (i !== array.length - 1) {
                        // Pick matched string from the array we collected earlier, substr
                        // will be in its original form case-wise
                        result.push(<span key={counter++} className="hit">{matches[i]}</span>);
                    }

                    return result;
                }, []));
            }
            else {
                result.push(item);
            }

            return result;
        }, []);
    }

    return result;
};

const BookShelf = () => {
    console.log('Book shelf');
    const books = useSelector(state => state.books.value);
    const selectedIndex = useSelector(state => state.books.index);
    // To highlight matches we need to get the query first
    const query = useSelector(state => state.books.query);
    // And create regular expressions from parts of the query
    const queryBits = query.split(' ').filter(r => r).map(i => new RegExp(i, 'ig'));

    const dispatch = useDispatch();

    const shelfRef = useRef(null);

    useEffect(() => {
        const keyDownHandler = event => {
            console.log(event.key);
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    dispatch(select(Math.min(selectedIndex + 1, books.length - 1)));
                    break;
                case 'ArrowUp':
                    event.preventDefault();
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

    // focus div by default
    useEffect(() => {
        shelfRef.current.focus();
    }, [shelfRef]);

    // Scroll selected item into view
    useEffect(() => {
        const el = shelfRef.current.querySelector(`[data-index='${selectedIndex}']`);
        el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }, [selectedIndex, shelfRef]);

    return (
        <div ref={shelfRef} className="book-shelf" tabIndex="0">
            {books.map((book, i) => 
                <div
                    key={i}
                    data-index={i}
                    className={`book-item ${i === selectedIndex ? 'selected' : ''}`}
                    onClick={() => {
                        dispatch(select(i))
                    }}
                >
                    <div className="book-title">{highlight(book.title, queryBits)}</div>
                    <div className="book-author">{highlight(book.author, queryBits)}</div>
                </div>
                )}
        </div>
    );
}

export default BookShelf;
