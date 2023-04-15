import {useState, useRef, useEffect, useContext} from "react";
import Avatar from './Avatar';
import SupportWindow from "./SupportWindow/SupportWindow";
import AuthContext from "../../context/AuthContext";
import './SupportEngine.css'

const SupportEngine = () => {
    const {user} = useContext(AuthContext)

    const ref = useRef(null)
    const [visable, setVisable] = useState(false)

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setVisable(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
    if (!user) return null;
    return (
        <div ref={ref} className='support'>

            <SupportWindow 
                visable={visable}
            />

            <Avatar 
                onClick = {() => setVisable(true)}
                style={{position: 'fixed', bottom: '24px', right: '24px'}}
            />

        </div>
    )
}

export default SupportEngine;

