import React from 'react';
import classes from './Input.module.css';

/**
 * Must use React.forwardRef and set as individual attribute
 * diffrent from props, to pass parent refs to child
 * components
 */
const Input = React.forwardRef((props, ref) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
	);
});

export default Input;
