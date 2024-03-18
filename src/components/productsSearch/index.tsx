import { useState } from 'react';
import styles from './index.module.css';
import { FilterButton, FilterMenu } from '../productsNav/productsFilter';




export default function ProductsSearch() {
    return (
        <div>
            <div>
                search form
            </div>
            <div>
                <SearchFilter/>
            </div>

        </div>
    )
}



function SearchFilter() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    }
    return (
        <div>
            <FilterButton handleClick={toggleMenu}/>
            <FilterMenu containerClass='' show={showMenu}/>
        </div>
    )
}