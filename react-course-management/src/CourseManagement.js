import React, { useState } from 'react';
import CourseCreationForm from './CourseCreationForm';
import CourseList from './CourseList';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);

  const addCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <div>
      <CourseCreationForm addCourse={addCourse} />
      <CourseList courses={courses} />
    </div>
  );
};

export default CourseManagement;
