import './button.styles.scss'
import { redirect } from 'react-router-dom'

export default function Button(props) {

    return (
        <button className="button" onClick={
            props.to ? () => redirect(props.to) : props.onClick
        }>
            { props.children }
        </button>
    )
}