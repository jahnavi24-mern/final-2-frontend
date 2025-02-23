import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById, submitFormResponses } from '../../api/form';
import styles from './SharedForm.module.css';
import { MdSend } from "react-icons/md";

const SharedForm = () => {
    const { formId } = useParams();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState({});
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const [submitted, setSubmitted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await getFormById(formId);
                setForm(response.data.form);
            } catch (error) {
                console.error("Error loading shared form:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [formId]);

    const handleInputChange = (inputType, value) => {
        setResponses(prev => ({ ...prev, [inputType]: value }));
    };

    const handleNext = () => {
        let nextIndex = currentIndex + 1;
            if (nextIndex >= form.flow.length) return;
            while (nextIndex < form.flow.length && form.flow[nextIndex].type === 'bubble') {
            nextIndex++;
        }
    
        setCurrentIndex(nextIndex);
    };

    const getNextIndex = (index) => {
        let nextIndex = index + 1;
            while (nextIndex < form.flow.length && form.flow[nextIndex].type === 'bubble') {
            nextIndex++;
        }
        return nextIndex;
    };
    
    

    const handleSave = (name, email) => {
        setUserDetails({ name, email });
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        if (!userDetails.name || !userDetails.email) {
            alert("Please enter your name and email.");
            return;
        }
        try {
            console.log("hiii-thanks, you have submitted");
            // await submitFormResponses(formId, userDetails, responses);
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting response:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!form) return <p>Form not found!</p>;
    if (submitted) return <p>Thank you! Your response has been submitted.</p>;

    return (
        <>
        <div className={styles.sharedForm}>
            <h2>{form.title}</h2>

            {form.flow.slice(0, getNextIndex(currentIndex) + 1).map((item, index) => (
                <div key={index} className={item.type === 'bubble' ? styles.chatBubbleLeft : styles.chatBubbleRight}>
                    {item.type === 'bubble' ? (
                        <p>{item.inputValue}</p>
                    ) : (
                        <div className={styles.inputContainer}>
                            <input 
                                type={item.inputType === 'textInput' ? 'text' : item.inputType} 
                                placeholder={`Enter ${item.inputType}`} 
                                value={responses[item.inputType] || ''} 
                                className={styles.sharedFormInput}
                                onChange={(e) => handleInputChange(item.inputType, e.target.value)} 
                            />
                            <MdSend onClick={handleNext} className={styles.nextButton}/>
                        </div>
                    )}
                </div>
            ))}

            {currentIndex === form.flow.length && (
                <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
            )}
        </div>

        {isOpen && <DetailsModal
        handleSave={handleSave}
        onClose = {() => setIsOpen(false)}
         />}

        </>
    );
};

export default SharedForm;

const DetailsModal = ({handleSave, onClose}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3>Please give the details to fill the form</h3>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.modalInput}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.modalInput}
                />                

                
                <div className={styles.modalButtons}>
                    <button
                        className={styles.cancelButton}
                        onClick={() => {
                            setName('');
                            setEmail('');
                            onClose();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.saveButton}
                        onClick={() => handleSave(name, email)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
