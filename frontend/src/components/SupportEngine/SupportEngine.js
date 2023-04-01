import {useState, useRef, useEffect} from "react";
import Avatar from './Avatar';
import SupportWindow from "./SupportWindow/SupportWindow";
import './SupportEngine.css'

const SupportEngine = () => {

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

    return (
        <div ref={ref}>

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

