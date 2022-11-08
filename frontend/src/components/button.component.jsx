import './button.styles.scss'
import { Link } from 'react-router-dom'

export default function Button(props) {
    if (props.to) {
        return (
            <Link className="button" to={props.to}>{props.children}</Link>
        )
    } else {
        return (
            <button className="button" onClick={
                props.onClick
            }>
                { props.children }
            </button>
        )
    }
}