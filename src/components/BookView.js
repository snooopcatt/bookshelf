import { useState } from "react";
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
    const books = useSelector(state => state.books.value);
    const selectedIndex = useSelector(state => state.books.index);
    const book = books[selectedIndex];
    const given = !!book && 'given' in book;

    const [atHome, setAtHome] = useState(!given);
    const [to, setTo] = useState(book?.given?.to || '');
    const [selected, setSelected] = useState(selectedIndex);

    const hintText = given ? getHintText(book.given.on) : '';

    if (selected !== selectedIndex) {
        setAtHome(!given);
        setSelected(selectedIndex);
        setTo(book?.given?.to || '');
    }

    const dispatch = useDispatch();

    const handleRadioChange = event => {
        const { id } = event.target;

        if (id === 'at_home') {
            setAtHome(true);
            setTo('');
            dispatch(take(selectedIndex));
        }
        else {
            setAtHome(false);
            dispatch(give({ selectedIndex, to: '' }));
        }
    }

    const handleName = ({ target }) => {
        setTo(target.value);
        dispatch(give({ selectedIndex, to: target.value }));
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
                            checked={atHome}
                            onChange={handleRadioChange}
                            />
                        <label htmlFor="at_home">At home</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="away"
                            name="status"
                            checked={!atHome}
                            onChange={handleRadioChange}
                            />
                        <label htmlFor="away">Away {hintText}</label>
                    </div>
                    { given ?
                        <div className="given-to">
                            <span>Given to</span>
                            <input
                                type="text"
                                value={to}
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