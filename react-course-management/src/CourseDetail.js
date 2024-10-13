
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const CourseDetail = ({ courses }) => {
    const { courseId } = useParams(); 
    const course = courses.find(course => course.id === parseInt(courseId)); 

    if (!course) {
        return <Navigate to="/courses" />; 
    }

    return (
        <div style={{ color: "black" }}>
            <h2>{course.title}</h2>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>FAQ:</strong> {course.faq}</p>
        </div>
    );
};

export default CourseDetail;
