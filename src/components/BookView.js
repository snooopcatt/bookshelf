import { useDispatch, useSelector } from "react-redux";
import { give, take } from "../data/dataSlice";

const intl = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
const since = date => {
    const from = date.getTime();
    const now = new Date().getTime();
    const dayDuration = 1000 * 60 * 60 * 24;

    if (now < from) {
        return 'Day yet to come';
    }
    else if (now - from < dayDuration) {
        return 'today';
    }
    else if (now - from < dayDuration * 2) {
        return 'yesterday';
    }
    else {
        // "days ago" is not a precise term, doing my best guess
        return `${Math.floor((now - from) / dayDuration)} days ago`;
    }
}

const getHintText = dateString => {
    const date = new Date(dateString);

    return `since ${intl.format(date)} (${since(date)})`;
}

const BookView = () => {
    console.log('Book view');
    const book = useSelector(state => state.books.selectedBook);

    const hintText = book?.given ? getHintText(book.given.on) : '';

    const dispatch = useDispatch();

    const handleRadioChange = event => {
        const { id } = event.target;

        if (id === 'at_home') {
            dispatch(take(book));
        }
        else {
            dispatch(give({ book, to: '' }));
        }
    }

    const handleName = ({ target }) => {
        dispatch(give({ book, to: target.value }));
    }

    return (
        <div className="book-view">
            { book ?
                <>
                    <h1>{book.title}</h1>
                    <div className="book-author">{book.author}</div>
                    <div>
                        <input
                            type="radio"
                            id="at_home"
                            name="status"
                            checked={!book.given}
                            onChange={handleRadioChange}
                            />
                        <label htmlFor="at_home">At home</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="away"
                            name="status"
                            checked={!!book.given}
                            onChange={handleRadioChange}
                            />
                        <label htmlFor="away">Away {hintText}</label>
                    </div>
                    { book.given ?
                        <div className="given-to">
                            <span>Given to</span>
                            <input
                                type="text"
                                value={book.given.to}
                                onChange={handleName}
                                />
                        </div>
                        : ''
                    }
                </>
            : ''}
        </div>
    )
}

export default BookView;