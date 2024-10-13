import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const MappingOverview = () => {
  const [mappings, setMappings] = useState([]);

  useEffect(() => {
    const fetchMappings = async () => {
      const mappingCollection = await getDocs(collection(db, 'courseChapterMapping'));
      setMappings(mappingCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchMappings();
  }, []);

  return (
    <div>
      <h2>Course Mappings Overview</h2>
      <Link to="/create-course">Map a New Course to Chapter</Link> 
      <ul>
        {mappings.map(mapping => (
          <li key={mapping.id}>
            Course ID: {mapping.courseId}, Chapter ID: {mapping.chapterId}, Topic ID: {mapping.topicId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MappingOverview;
