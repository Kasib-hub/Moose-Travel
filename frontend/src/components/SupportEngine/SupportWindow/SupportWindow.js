import { styles } from '../styles';
import Chatbot from '../../Chatbot';

const SupportWindow = props => {
    return (
        <div className='support-window'
            style={{
                ...styles.supportWindow,
                ...{ 
                    "opacity": props.visable ? '1' : '0',
                    "z-index": props.visable ? '0' : '-1',
                 }
            }}
        >

            <Chatbot />

        </div>
    )
}

export default SupportWindow