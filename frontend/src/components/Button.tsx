type Props = {
    buttonText: string,
    buttonClass: string,
    onClick?: () => void;
    type?: "button" | "submit";
}


export default function Button(
    {
        buttonText,
        buttonClass,
        onClick,
        type = "button"
    }: Props) {

    return (
        <button
            className={`btn md-4 ${buttonClass}`}
            type={type}
            onClick={onClick}
        >
            {buttonText}
        </button>
    )
}