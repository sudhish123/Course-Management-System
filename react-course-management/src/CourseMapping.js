
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const CourseMapping = () => {
  const { courseId } = useParams(); 
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(courseId); 
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = await getDocs(collection(db, 'courses'));
      setCourses(courseCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchChapters = async () => {
      const chapterCollection = await getDocs(collection(db, 'chapters'));
      setChapters(chapterCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchCourses();
    fetchChapters();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedChapter) {
        const topicsQuery = query(collection(db, 'topics'), where('chapterId', '==', selectedChapter));
        const topicCollection = await getDocs(topicsQuery);
        setTopics(topicCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setTopics([]); 
      }
    };

    fetchTopics();
  }, [selectedChapter]);

  const handleMapping = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !selectedChapter || !selectedTopic) return;

    try {
      await addDoc(collection(db, 'courseChapterMapping'), {
        courseId: selectedCourse,
        chapterId: selectedChapter,
        topicId: selectedTopic 
      });
      console.log("Course mapped to chapter and topic successfully");

      setSelectedCourse(courseId); 
      setSelectedChapter('');
      setSelectedTopic('');
    } catch (error) {
      console.error("Error mapping course to chapter and topic: ", error);
    }
  };

  return (
    <div>
      <h2>Map Course to Chapters and Topics</h2>
      <form onSubmit={handleMapping}>
        <div>
          <label>Course:</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Chapter:</label>
          <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} required>
            <option value="">Select Chapter</option>
            {chapters.map(chapter => (
              <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Topic:</label>
          <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} required disabled={!selectedChapter}>
            <option value="">Select Topic</option>
            {topics.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.title}</option>
            ))}
          </select>
        </div>
        <button type="submit">Map Course to Chapter and Topic</button>
      </form>
    </div>
  );
};

export default CourseMapping;
