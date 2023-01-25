import logoImage from "../../assets/Logo.svg";
import { Modal } from "../Modal";


export function Header() {

    return (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between transition-colors ">
            <img src={logoImage} alt="" />

            <Modal /> 
        </div>
    )
}