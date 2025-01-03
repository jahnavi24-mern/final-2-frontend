import React from 'react';
import styles from './FolderModal.module.css';

const FolderModal = ({ isOpen, onClose, onSave }) => {
    const [folderName, setFolderName] = React.useState('');

    const handleSave = () => {

        onSave(folderName);
        setFolderName('');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Create New Folder</h2>
                <input
                    type="text"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className={styles.modalInput}
                />
                <div className={styles.modalButtons}>
                    <button
                        className={styles.cancelButton}
                        onClick={() => {
                            setFolderName('');
                            onClose();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.saveButton}
                        onClick={handleSave}
                        disabled={!folderName.trim()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FolderModal;
