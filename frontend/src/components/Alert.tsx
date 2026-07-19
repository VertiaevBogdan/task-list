
type Props = {
    message: string;
    type: string;
}

export default function Alert({message, type}: Props){
    return (
        <div role="alert" className={`alert ${type}`}>

            <span>{message}</span>
        </div>
    );
}