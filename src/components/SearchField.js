import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../data/dataSlice";

const SearchField = () => {
    const storedQuery = useSelector(state => state.books.query);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    if (storedQuery !== query) {
        setQuery(storedQuery);
    }

    const onChange = event => {
        const value = event.target.value;
        setQuery(value);
        dispatch(filter(value));
    }

    return (
        <div className="search-field">
            <i></i>
            <input
                type="text"
                placeholder="search"
                value={query}
                onChange={onChange}
                ></input>
        </div>
    )
}

export default SearchField;