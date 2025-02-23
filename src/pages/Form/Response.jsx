import styles from '../Form/Form.module.css';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
// import { getFormResponses, getFormAnalytics } from '../../api/form';

const Responses = (formId) => {
    const { folderId } = useParams();

    const [analytics, setAnalytics] = useState({});
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!formId) return;

            setLoading(true);
            try {
                const [analyticsData, responsesData] = await Promise.all([
                    // getFormAnalytics(formId),
                    // getFormResponses(formId),
                ]);

                setAnalytics(analyticsData.data);
                setResponses(responsesData.data.responses);
            } catch (error) {
                console.error('Error fetching responses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [formId]);

    return (
        <div className={styles.response}>

            <div className={styles.responseContainer}>
                <div className={styles.responseContent}>
                    <div className={styles.card}>Views: {analytics.views || 0}</div>
                    <div className={styles.card}>Starts: {analytics.starts || 0}</div>
                </div>

                <div className={styles.rightContent}>
                    <h3>Responses</h3>
                    {loading ? (
                        <p>Loading responses...</p>
                    ) : (
                        <table className={styles.responseTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Responses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses.length > 0 ? (
                                    responses.map((response, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{new Date(response.timestamp).toLocaleString()}</td>
                                            <td>
                                                {response.answers.map((ans, idx) => (
                                                    <p key={idx}><strong>{ans.inputType}:</strong> {ans.inputValue}</p>
                                                ))}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No responses yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Responses;
