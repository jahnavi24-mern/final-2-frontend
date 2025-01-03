import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Delete Folder</h3>
                <p>Are you sure you want to delete "{itemName}"?</p>
                <p className={styles.warningText}>This action cannot be undone.</p>
                
                <div className={styles.buttonGroup}>
                    <button 
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className={styles.deleteButton}
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
