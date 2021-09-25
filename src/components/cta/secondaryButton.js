import React from 'react';

import styles from '../../styles/components/SecondaryButton.module.scss';

const SecondaryButton=(props)=>{

    return(
        <div className={
            props.disabled && props.fullWidth?
            `${styles.t_btn_wrapper} ${styles.t_btn_disabled} ${styles.t_full_width} position-relative`
            :props.disabled?
            `${styles.t_btn_wrapper} ${styles.t_btn_disabled} position-relative`
            :props.fullWidth?
            `${styles.t_btn_wrapper} ${styles.t_full_width} position-relative`
            :
            `${styles.t_btn_wrapper} position-relative`
            }>
            <button className={`${styles.t_btn}`} onClick={props.click} type={props.type? props.type: "button"}>
                <span>{props.name}</span>
            </button>
        </div>
    )

}

export default SecondaryButton;