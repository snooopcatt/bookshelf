import { useSelector } from "react-redux";
import SearchField from "./SearchField";

const Header = () => {
    const away = useSelector(state => state.books.away);
    const atHome = useSelector(state => state.books.atHome);
    const total = useSelector(state => state.books.total);

    return (
        <div className="shelf-header">
            <SearchField/>
            <div className="stretcher"></div>
            <button>{away} away</button>
            <button>{atHome} at home</button>
            <button>{total} total</button>
        </div>
    )
}

export default Header;
