import { FiTrash } from 'react-icons/fi';
import styles from '../Form/Form.module.css';

export const componentMap = (item, index, handleInputChange, handleDelete) => {
    return {
        text: (
            <div className={styles.component}>
                Text Component
                <input
                    type="text"
                    placeholder="Click to add text"
                    className={styles.componentInput}
                    value={item.inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>
            </div>
        
        ),
        image: (
            <div className={styles.component}>
                Image Component
                <input
                    type="text"
                    placeholder="Click to add link"
                    className={styles.componentInput}
                    value={item.inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>
            </div>
        ),
        video: (
            <div className={styles.component}>
                Text Component
                <input
                    type="text"
                    placeholder="Click to add link"
                    className={styles.componentInput}
                    value={item.inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>
            </div>
        ),
        gif: (
            <div className={styles.component}>
                Text Component
                <input
                    type="text"
                    placeholder="Click to add link"
                    className={styles.componentInput}
                    value={item.inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>
            </div>
        ),
        textInput: (
            <div className={styles.component}>
                Input Text
                <p className={styles.para}>Hint : User will input a text on his form</p>
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>
            </div>
        ),
        number: (
            <div className={styles.component}>
                Input Number
                <p className={styles.para}>Hint : User will input a number on his form</p>
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>            
            </div>
        ),
        email: (
            <div className={styles.component}>
                Input Email
                <p className={styles.para}>Hint : User will input an email on his form</p>
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>            
            </div>
        ),
        phone: (
            <div className={styles.component}>
                Input Phone
                <p className={styles.para}>Hint : User will input phone on his form</p>
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>            
            </div>
        ),
        date: (
            <div className={styles.component}>
                Input Date
                <p className={styles.para}>Hint : User will input date on his form</p>
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>            
            </div>
        ),
        rating: (
            <div className={styles.component}>
                Input Rate
                <p className={styles.para}>Hint : User will tap to rate out of 5</p>
                <FiTrash className={styles.delete} onClick={() => handleDelete(index)}/>            
            </div>
        ),
    }[item.inputType] || <div>Unsupported Component</div>;
};
