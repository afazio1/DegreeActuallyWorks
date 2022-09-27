import "./button.styles.css";

const Button = ({ text }) => {
	return (
		<button className="button">
			{ text }		
        </button>
	)
}

export default Button;