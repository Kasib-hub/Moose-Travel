import { useState } from "react";
import { styles } from './styles';

const Avatar = props => {

    const [hovered, setHovered] = useState(false);


    return (
        <div style={props.style}>

            <div
                className="transition-3"
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0'}
                }}>
                Ask something!
            </div>

            <div

                className="transition-3"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '1px solid #014d4e' : '4px solid #014d4e'}
                }}
            
            />

        </div>
    )
}

export default Avatar;