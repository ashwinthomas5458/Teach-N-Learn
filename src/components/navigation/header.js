import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import styles from '../../styles/components/Header.module.scss';

const Header = ()=>{
    const [logoWhite, setLogoWhite] = useState(false);
    const location = useLocation();

    const handlePathChange=()=>{
        if(location.pathname==="/register") setLogoWhite(true);
        else setLogoWhite(false);
    }

    useEffect(()=>{
        handlePathChange();
    },[location.pathname]);

    return(
        <header className={`${styles.t_header} container-fluid px-0 position-fixed py-3`}>
            <div className="container py-3">
                <Link to="/">
                    <a className={logoWhite? "t-logo mb-0 t-logo-white":"t-logo mb-0"}>Logo</a>
                </Link>
            </div>
        </header>
    )
}

export default Header;