import { useState } from "react";
import { useDispatch } from "react-redux";
import { filter } from "../data/dataSlice";

const SearchField = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

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