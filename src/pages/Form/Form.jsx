import styles from '../Form/Form.module.css';
import { useState } from 'react';
import { FiShare2, FiSave} from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import Theme from '../../components/Theme/Theme'

const Form = () => {
    const [formName, setFormName] = useState('');
    return (
        <div className={styles.form}>
            <div className={styles.navbar}>
                <div className={styles.leftSection}>
                    <input placeholder='Enter form name' value={formName} />
                </div>
                <div className={styles.middleSection}>
                    <button className={styles.formButton}>
                        Flow
                    </button>
                    <button className={styles.formButton}>
                        Response
                    </button>
                </div>
                <div className={styles.rightSection}>
                    <Theme />
                    <button className={styles.saveButton}>
                        <FiSave />
                        Save
                    </button>
                    <button className={styles.shareButton}>
                        <FiShare2 />
                        Share
                    </button>
                    <RxCross2 className={styles.crossButton}/>
                </div>
            </div>

            <div className = {styles.content}>

            </div>
        </div>
    )
}

export default Form;