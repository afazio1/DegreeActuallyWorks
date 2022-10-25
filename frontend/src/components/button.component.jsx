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
