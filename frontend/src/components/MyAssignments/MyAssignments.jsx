import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header/Header'
import './index.css';

const Assessments = () => {
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssessments = async () => {
            const jwtToken = Cookies.get('jwtToken');
            try {
                const res = await fetch('http://localhost:3000/api/v1/assessments', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                setAssessments(data.assessments);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAssessments();
    }, []);

    return (<>
        <Header />
        <div className="assessments-container">
            {error && <p className="error-message">{error}</p>}
            <div className="card-container">
                {assessments.length === 0 ? (
                    <p>No assessments found</p>
                ) : (
                    assessments.map((assessment) => (
                        <div key={assessment._id} className="assessment-card">
                            <h3 className="assessment-title">{assessment.title}</h3>
                            <p className="assessment-description">{assessment.description}</p>
                            <a href={assessment.githublink} className="assessment-link">GitHub Link</a>
                            {assessment.publishlink && (
                                <a href={assessment.publishlink} className="assessment-publish-link">Publish Link</a>
                            )}
                            <p className="assessment-date">Published on: {new Date(assessment.publishedAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    );
};

export default Assessments;
