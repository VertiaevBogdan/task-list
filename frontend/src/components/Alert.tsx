import SuccessIcon from "./icons/SuccessIcon.tsx";
import ErrorIcon from "./icons/ErrorIcon.tsx";
import {useEffect, useState} from "react";

type Props = {
    message: string;
    type: string;
    onClose: () => void;
}

export default function Alert({message, type, onClose}: Props){
    const [isClosing, setIsClosing] = useState(false);

    let icon;

    if (type === "alert-success"){
        icon = <SuccessIcon/>;
    } else {
        icon = <ErrorIcon/>
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClosing(true);

            setTimeout(() => {
                onClose();
            }, 300);
        }, 3000);

        return() => {
            clearTimeout(timer);
        }

    }, [onClose])

    return (
        <div className="
            fixed
            bottom-4
            right-4
            z-50
        ">
            <div role="alert" className={`
            alert
            ${type}
            ${isClosing ? "alert-exit" : "alert-enter"}`
            }>
                {icon}
                <span>{message}</span>
            </div>
        </div>
    );
}