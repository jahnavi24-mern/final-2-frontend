import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { FiShare2, FiChevronDown, FiChevronUp, FiFolder, FiPlus, FiSettings, FiLogOut, FiTrash2 } from 'react-icons/fi';
import FolderModal from '../../components/FolderModal/FolderModal';
import { workspaceApi } from '../../api/workspace';
import { getUserDetails } from '../../api/auth';
import { createFolder, deleteFolder } from '../../api/folder';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom';
import Theme from '../../components/Theme/Theme';

const Dashboard = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [workspace, setWorkspace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const navigate = useNavigate();

    const fetchWorkspaceDetails = async () => {
        try {
            setLoading(true);
            const userData = await getUserDetails();
            
            const workspaceData = await workspaceApi.getWorkspaceDetails(
                userData.user.workspaces[0]
            );

            setWorkspace(workspaceData.workspace);
            setFolders(workspaceData.workspace.folders || []);
            
        } catch (error) {
            console.error('Error fetching workspace:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchWorkspaceDetails();
    }, []);


    const handleCreateFolder = async (folderName) => {
        try {
            const response = await createFolder(workspace._id, folderName);
            
            const newFolder = {
                _id: response._id,
                name: response.folderName,
                forms: [],
                workspace: workspace._id
            };

            setFolders(prevFolders => [...prevFolders, newFolder]);
            setShowModal(false);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    const handleDeleteClick = (e, folder) => {
        e.stopPropagation();
        setFolderToDelete(folder);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!folderToDelete || !folderToDelete._id) return;

        try {
            await deleteFolder(workspace._id, folderToDelete._id);
            
            setFolders(prevFolders => 
                prevFolders.filter(folder => folder._id !== folderToDelete._id)
            );
            
            if (selectedFolder?._id === folderToDelete._id) {
                setSelectedFolder(null);
            }
            
            setShowDeleteModal(false);
            setFolderToDelete(null);
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const createFormClick = () => {
        navigate('/form')
    }

    return (
        <div className={styles.dashboard}>
            <nav className={styles.navbar}>

                <div className={styles.userDropdown}>
                    <button
                        className={styles.userButton}
                        onClick={() => setIsDropdownOpen(prev => !prev)}
                    >
                        <div className={styles.userAvatar}>
                            {workspace?.owner?.userName?.charAt(0)}
                        </div>
                        <span>{workspace?.owner?.userName}</span>
                        {isDropdownOpen ?
                            <FiChevronUp className={styles.chevron} /> :
                            <FiChevronDown className={styles.chevron} />
                        }
                    </button>

                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownSection}>
                                <div className={styles.mainWorkspace}>
                                    <div className={styles.workspaceInfo}>
                                        <p className={styles.workspaceName}>
                                            {workspace?.owner?.userName}'s Workspace
                                        </p>
                                        <span className={styles.ownerTag}>Owner</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.dropdownSection}>
                                <div className={styles.sectionHeader}>
                                    <p>Other Workspaces</p>
                                </div>
                                <div className={styles.workspaceList}>
                                    {workspace?.sharedWith?.length > 0 ? (
                                        workspace.sharedWith.map(share => (
                                            <div key={share.user.id} className={styles.sharedWorkspace}>
                                                <div className={styles.workspaceAvatar}>
                                                    {share.user.userName.charAt(0)}
                                                </div>
                                                <div className={styles.workspaceInfo}>
                                                    <p className={styles.workspaceName}>
                                                        {share.user.userName}'s Workspace
                                                    </p>
                                                    <span className={styles.accessLevel}>
                                                        {share.accessLevel}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className={styles.emptyState}>
                                            No shared workspaces
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.dropdownSection}>
                                <button
                                    className={styles.dropdownButton}
                                    onClick={() => {/* Handle settings */}}
                                >
                                    <FiSettings /> Settings
                                </button>
                                <button
                                    className={`${styles.dropdownButton} ${styles.logoutButton}`}
                                    onClick={() => {/* Handle logout */}}
                                >
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.rightSection}>
                    <button className={styles.shareButton}>
                        <FiShare2 />
                        Share
                    </button>

                    <Theme />

                </div>
            </nav>

            <div className={styles.content}>
                <div className={styles.folderSection}>
                    <button
                        className={styles.createButton}
                        onClick={() => setShowModal(true)}
                    >
                        <FiFolder /> Create Folder
                    </button>
                    {folders?.map((folder) => (
                        <div
                            key={folder._id}
                            className={`${styles.folderCard} ${selectedFolder?._id === folder._id ? styles.selected : ''}`}
                            onClick={() => setSelectedFolder(folder)}
                        >
                            <span>{folder.name}</span>
                            <button 
                                className={styles.deleteButton}
                                onClick={(e) => handleDeleteClick(e, folder)}
                            >
                                <FiTrash2 className={styles.deleteIcon} />
                            </button>
                        </div>
                    ))}

                </div>

                <div className={styles.formSection}>
                    <button
                        className={styles.createFormButton}
                        disabled={!selectedFolder}
                        onClick={createFormClick}
                    >
                        <FiPlus /> Create a typebot
                    </button>

                    {selectedFolder && (
                        <div className={styles.formList}>
                            {selectedFolder.forms.length === 0 ? (
                                <p className={styles.emptyState}>
                                    No forms created yet
                                </p>
                            ) : (
                                selectedFolder.forms.map(form => (
                                    <div key={form.id} className={styles.formCard}>
                                        {form.name}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <FolderModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleCreateFolder}
            />

            <DeleteModal 
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setFolderToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                itemName={folderToDelete?.name}
            />
        </div>
    );
};

export default Dashboard;