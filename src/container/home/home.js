import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { PrimaryButton } from '../../components/cta';
import Cover from '../../assets/images/cover.png';

const Home=()=>{
    const [condensed, setCondensed] = useState(false);
    const router = useHistory();
    const location = useLocation();

    const handlePathChange=()=>{
        if(location.pathname==="/register") setCondensed(true);
        else setCondensed(false);
    }

    useEffect(()=>{
        handlePathChange();
    },[location.pathname]);

    return(
        <div className={condensed? "t-home-container t-home-condensed": "t-home-container"}>
            <div className="container d-flex align-items-center h-100 justify-content-center flex-column">
                <div className="t-cover-illustration-wrapper">
                    <img src={Cover} alt="Cover image"/>
                </div>
                {
                    !condensed?
                    <>
                    <h2 className="fw-bold py-4 mb-0 t-fade-in">Share your knowledge</h2>
                    <h3 className="t-fade-in">Be part in building a better world by sharing your knowledge with kids less privileged than you.</h3>
                    <div className="pt-3 t-action-btn-wrapper t-fade-in">                    
                        <PrimaryButton click={()=>router.push('/register')} name="Register Now"/>
                    </div>
                    </>
                :
                null
                }
            </div>
        </div>
    )
}

export default Home;