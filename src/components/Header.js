import { useDispatch, useSelector } from "react-redux";
import { filter, filterAtHome, filterAway } from "../data/dataSlice";
import SearchField from "./SearchField";

const Header = () => {
    console.log('Header');
    const away = useSelector(state => state.books.away);
    const atHome = useSelector(state => state.books.atHome);
    const total = useSelector(state => state.books.total);

    const dispatch = useDispatch();

    const onAwayClick = () => dispatch(filterAway());
    const onAtHomeClick = () => dispatch(filterAtHome());
    const onTotalClick = () => dispatch(filter(''));

    return (
        <div className="shelf-header">
            <SearchField/>
            <div className="stretcher"></div>
            <button onClick={onAwayClick}>{away} away</button>
            <button onClick={onAtHomeClick}>{atHome} at home</button>
            <button onClick={onTotalClick}>{total} total</button>
        </div>
    )
}

export default Header;
