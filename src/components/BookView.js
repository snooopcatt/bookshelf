import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { give, take } from "../data/dataSlice";

const BookView = () => {
    const books = useSelector(state => state.books.value);
    const selectedIndex = useSelector(state => state.selection.index);
    const book = books[selectedIndex];
    const given = !!book && 'given' in book;

    const [atHome, setAtHome] = useState(!given);
    const [to, setTo] = useState(book?.given?.to || '');
    const [selected, setSelected] = useState(selectedIndex);

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
                        <label htmlFor="away">Away</label>
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