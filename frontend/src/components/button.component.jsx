<<<<<<< HEAD
import "./button.styles.css";

const Button = ({ text }) => {
    return (
        <button className="button">
            { text }
        </button>
    )
}
export default Button;
=======
import './button.styles.scss'
import { useNavigate } from 'react-router-dom'

const Button = (props) => {
    let navigate = useNavigate()

    return (
        <button className="button" onClick={
            props.to ? navigate(props.to) : props.onClick
        }>
            { props.children }
        </button>
    )
}

export default Button
>>>>>>> a58444c8284d4ce67515658f3606745f3717b71c
