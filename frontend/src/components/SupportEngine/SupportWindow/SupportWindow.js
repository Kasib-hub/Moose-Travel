import { styles } from '../styles';
import Chatbot from '../../Chatbot';

const SupportWindow = props => {
    return (
        <div
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visable ? '1' : '0' }
            }}
        >

            <Chatbot />

        </div>
    )
}

export default SupportWindow