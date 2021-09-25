/*Package importing*/
import React from 'react';


/*import style*/
import styles from '../../styles/components/InputBox.module.scss';

const Input =(props)=>{

    const valueChange=(e)=>{
        if (!props.isDisabled) {
            props.valueChange(e.target.value);
        }
    }

    return(
        <div className={props.isDisabled ? `${styles.t_input_wrap} ${styles.t_input_disabled}`: `${styles.t_input_wrap}`}>
           <input id={props.id}
            value={props.value}
            type={props.type}
            className={styles.t_input_box}
            onChange={valueChange}
            placeholder={props.placeholder}
            required={props.required}
            readOnly={props.readOnly}
            disabled={props.isDisabled ? true : false}
            />
            {props.label ? <label htmlFor={props.id} className="label">{props.label}</label> : null}
        </div>
    )
}

export default Input;