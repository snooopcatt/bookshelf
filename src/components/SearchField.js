import { useDispatch, useSelector } from "react-redux";
import { filter } from "../data/dataSlice";

const SearchField = () => {
    console.log('Search');
    const storedQuery = useSelector(state => state.books.query);
    const dispatch = useDispatch();

    const onChange = event => {
        const value = event.target.value;
        dispatch(filter(value));
    }

    return (
        <div className="search-field">
            <i></i>
            <input
                type="text"
                placeholder="search"
                value={storedQuery}
                onChange={onChange}
                ></input>
        </div>
    )
}

export default SearchField;