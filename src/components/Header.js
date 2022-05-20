import { useState } from "react"
import SearchField from "./SearchField";

const Header = () => {
    const [away, setAway] = useState(0);
    const [atHome, setAtHome] = useState(5);
    const [total, setTotal] = useState(154);

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
