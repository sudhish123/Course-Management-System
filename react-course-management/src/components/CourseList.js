
import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import './CourseList.css'; 

const CourseList = ({ courses }) => {
  const pageSize = 5;
  const totalPages = Math.ceil(courses.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const displayedCourses = courses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ color: "black" }}>
      <h2>Courses</h2>
      <ul>
        {displayedCourses.map(course => (
          <li key={course.id}>
            <Link 
              to={`/courses/${course.id}`} 
              className="course-link"
            >
              {course.title ? course.title : 'Unnamed Course'}
            </Link>
          </li>
        ))}
      </ul>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default CourseList;
