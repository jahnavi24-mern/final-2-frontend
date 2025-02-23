import styles from '../Form/Form.module.css';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiShare2, FiSave, FiMessageSquare, FiImage } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { RiVideoAddLine, RiFileGifLine, RiText, RiHashtag, RiAtLine, RiPhoneLine, RiCalendarLine, RiStarLine, RiCheckboxLine } from 'react-icons/ri'
import Theme from '../../components/Theme/Theme'
import { createFlow, getFormById, shareForm } from '../../api/form';
import { componentMap } from './ComponentMap';
import Responses from './Response';

const Form = () => {
    const { folderId } = useParams();

    const [searchParams] = useSearchParams();
    const formId = searchParams.get('formId');

    const [formName, setFormName] = useState('');
    const [contentList, setContentList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [flow, setFlow] = useState(null);
    const [view, setView] = useState('flow');

    useEffect(() => {
        const fetchForm = async () => {
            if (!formId) return;

            try {
                setLoading(true);
                const response = await getFormById(formId);
                const formData = response.data.form;

                if (formData) {
                    setFormName(formData.title || '');
                    setContentList(formData.flow || []);
                }
            } catch (error) {
                console.error('Error loading the form:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [formId]);

    const handleClick = (type, inputType) => {
        setContentList((prevList) => [...prevList, {
            type: type,
            inputType: inputType,
            inputValue: ""
        }]);

    };

    const handleInputChange = (index, value) => {
        setContentList((prevList) =>
            prevList.map((item, i) =>
                i === index ? { ...item, inputValue: value } : item
            )
        );
    };

    const handleDelete = (index) => {
        setContentList((prevList) => prevList.filter((_, i) => i !== index));
    };


    const handleSave = async () => {
        const flowData = {
            folderId,
            title: formName,
            flow: contentList.map(({ type, inputType, inputValue }) => ({
                type,
                inputType,
                inputValue,
            })),
        };

        console.log("flow data", flowData.flow);

        setFlow(flowData);

        try {
            const response = await createFlow(formName, folderId, flowData.flow);
            console.log("Saved successfully:", response.data);
            alert("Flow saved successfully!");
        } catch (error) {
            console.error("Error saving form:", error);
        }
    };


    const handleShare = async () => {
        if (!formId) {
            alert("Please save the form before sharing.");
            return;
        }

        try {
            const sharedUrl = await shareForm(formId);
            navigator.clipboard.writeText(sharedUrl);
            alert("Link copied to clipboard!");
        } catch (error) {
            console.error("Error sharing form:", error);
            alert("Failed to generate shareable link.");
        }
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
                    <button
                        className={`${styles.formButton} ${view === 'flow' ? styles.active : ''}`}
                        onClick={() => setView('flow')}
                    >
                        Flow
                    </button>
                    <button
                        className={`${styles.formButton} ${view === 'responses' ? styles.active : ''}`}
                        onClick={() => setView('responses')}
                    >
                        Response
                    </button>
                </div>
                <div className={styles.rightSection}>
                    <Theme />
                    <button className={styles.saveButton} onClick={handleSave}>
                        <FiSave />
                        Save
                    </button>
                    <button className={styles.shareButton} onClick={handleShare}>
                        <FiShare2 />
                        Share
                    </button>
                    <RxCross2 className={styles.crossButton} />
                </div>
            </div>

            <div className={styles.content}>

                {view === 'flow' ? (
                    <>

                        <div className={styles.leftContent}>
                            <p>Bubbles</p>
                            <div className={styles.bubbles}>
                                <div className={styles.bubbleItem} onClick={() => handleClick("bubble", "text")}>
                                    <FiMessageSquare className={styles.icon} />
                                    <p>Text</p>
                                </div>
                                <div className={styles.bubbleItem} onClick={() => handleClick("bubble", "image")}>
                                    <FiImage className={styles.icon} />
                                    <p>Image</p>
                                </div>
                                <div className={styles.bubbleItem} onClick={() => handleClick("bubble", "video")}>
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
                                <div className={styles.inputItem} onClick={() => handleClick("input", "textInput")} >
                                    <RiText className={styles.icon} />
                                    <p>Text</p>
                                </div>
                                <div className={styles.inputItem} onClick={() => handleClick("input", "number")} >
                                    <RiHashtag className={styles.icon} />
                                    <p>Number</p>
                                </div>
                                <div className={styles.inputItem} onClick={() => handleClick("input", "email")}>
                                    <RiAtLine className={styles.icon} />
                                    <p>Email</p>
                                </div>
                                <div className={styles.inputItem} onClick={() => handleClick("input", "phone")}>
                                    <RiPhoneLine className={styles.icon} />
                                    <p>Phone</p>
                                </div>
                                <div className={styles.inputItem} onClick={() => handleClick("input", "date")}>
                                    <RiCalendarLine className={styles.icon} />
                                    <p>Date</p>
                                </div>
                                <div className={styles.inputItem} onClick={() => handleClick("input", "rating")}>
                                    <RiStarLine className={styles.icon} />
                                    <p>Rating</p>
                                </div>
                                <div className={styles.inputItem} onClick={() => handleClick("input", "buttons")}>
                                    <RiCheckboxLine className={styles.icon} />
                                    <p>Buttons</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightContent}>
                            <div className={styles.componentStart}>Start</div>
                            {contentList.map((item, index) => (
                                <div key={index} className={styles.componentContainer}>
                                    {componentMap(item, index, handleInputChange, handleDelete)}
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
                    </>

                ) : (
                    <Responses formId={formId} />
                )}

            </div>
        </div>
    )
}

export default Form;