import styles from '../Form/Form.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiShare2, FiSave, FiMessageSquare, FiImage } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { RiVideoAddLine, RiFileGifLine, RiText, RiHashtag, RiAtLine, RiPhoneLine, RiCalendarLine, RiStarLine, RiCheckboxLine } from 'react-icons/ri'
import Theme from '../../components/Theme/Theme'
import { createFlow } from '../../api/form';

const componentMap = {
    text: <div className={styles.component}>
        Text Component
        <input type="link" placeholder='Click to add text' />
    </div>,
    image: <div className={styles.component}>
        Image Component
        <input type="link" placeholder='Click to add link' />
    </div>,
    video: <div className={styles.component}>
        Video Component
        <input type="link" placeholder='Click to add link' />
    </div>,
    gif: <div className={styles.component}>GIF Component</div>,
    number: <input type="number" placeholder="Enter number" />,
    email: <input type="email" placeholder="Enter email" />,
    phone: <input type="tel" placeholder="Enter phone" />,
    date: <input type="date" />,
    rating: <input type="range" min="1" max="5" />,
    buttons: <button className={styles.component}>Button Component</button>,
};

const Form = () => {
    const { folderId } = useParams();
    const [formName, setFormName] = useState('');
    const [contentList, setContentList] = useState([]);
    const [flow, setFlow] = useState(null);

    const handleClick = (type, inputType) => {
        setContentList((prevList) => [...prevList, {
            type: type,
            // content: content,
            inputType: inputType,
        }]);

    };


    const handleSave = async () => {
        const flowData = {
            folderId,
            title: formName,
            flow: contentList,
        };
        setFlow(flowData);

        try {
            const response = await createFlow(formName, folderId, contentList);

            console.log("response", response.data);

        }catch(error){
            console.error('Error creating form:', error);
        }
        
        alert('Flow saved successfully!');
    };

    return (
        <div className={styles.form}>
            <div className={styles.navbar}>
                <div className={styles.leftSection}>
                    <input
                        placeholder='Enter form name'
                        value={formName}
                        className={styles.inputForm}
                        onChange={(e) => { setFormName(e.target.value) }}
                    />
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
                    <button className={styles.saveButton} onClick={handleSave}>
                        <FiSave />
                        Save
                    </button>
                    <button className={styles.shareButton}>
                        <FiShare2 />
                        Share
                    </button>
                    <RxCross2 className={styles.crossButton} />
                </div>
            </div>

            <div className={styles.content}>

                <div className={styles.leftContent}>
                    <p>Bubbles</p>
                    <div className={styles.bubbles}>
                        <div className={styles.bubbleItem} onClick={() => handleClick("bubble","text")}>
                            <FiMessageSquare className={styles.icon} />
                            <p>Text</p>
                        </div>
                        <div className={styles.bubbleItem} onClick={() => handleClick("bubble","image")}>
                            <FiImage className={styles.icon} />
                            <p>Image</p>
                        </div>
                        <div className={styles.bubbleItem} onClick={() => handleClick("bubble","video")}>
                            <RiVideoAddLine className={styles.icon} />
                            <p>Video</p>
                        </div>
                        <div className={styles.bubbleItem}>
                            <RiFileGifLine className={styles.icon} />
                            <p>GIF</p>
                        </div>
                    </div>

                    <p>Inputs</p>
                    <div className={styles.inputs}>
                        <div className={styles.inputItem} onClick={() => handleClick("input","text")} >
                            <RiText className={styles.icon} />
                            <p>Text</p>
                        </div>
                        <div className={styles.inputItem} onClick={() => handleClick("input","number")} >
                            <RiHashtag className={styles.icon} />
                            <p>Number</p>
                        </div>
                        <div className={styles.inputItem} onClick={() => handleClick("input","email")}>
                            <RiAtLine className={styles.icon} />
                            <p>Email</p>
                        </div>
                        <div className={styles.inputItem} onClick={() => handleClick("input","tel")}>
                            <RiPhoneLine className={styles.icon} />
                            <p>Phone</p>
                        </div>
                        <div className={styles.inputItem} onClick={() => handleClick("input","date")}>
                            <RiCalendarLine className={styles.icon} />
                            <p>Date</p>
                        </div>
                        <div className={styles.inputItem} onClick={() => handleClick("input","rating")}>
                            <RiStarLine className={styles.icon} />
                            <p>Rating</p>
                        </div>
                        <div className={styles.inputItem} onClick={() => handleClick("input","buttons")}>
                            <RiCheckboxLine className={styles.icon} />
                            <p>Buttons</p>
                        </div>
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <div className={styles.componentStart}>Start</div>
                    {contentList.map((item, index) => (
                        <div key={index} className={styles.componentContainer}>
                            {componentMap[item.inputType]}
                        </div>
                    ))}

                    {flow && (
                        <div className={styles.savedFlow}>
                            <h3>Saved Flow: {flow.formName}</h3>
                            <ul>
                                {flow.flow.map((item, idx) => (
                                    <li key={idx}>{item.inputType}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Form;