import React, { useState } from 'react';
import './CourseTopics.css'; 

const CourseTopics = () => {
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: 'Chapter 1',
      isOpen: false,
      topics: [
        { id: 1, title: 'Course Content (Default)', description: '', content: '', attachments: [], isDefault: true },
      ],
    },
    {
      id: 2,
      title: 'Chapter 2',
      isOpen: false,
      topics: [{ id: 1, title: 'Course Content (Default)', description: '', content: '', attachments: [], isDefault: true }],
    },
  ]);

  const [courses] = useState([
    { id: 1, title: 'Course 1' },
    { id: 2, title: 'Course 2' },
  ]);

  const [courseMappings, setCourseMappings] = useState([]); 

  const toggleChapter = (chapterId) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, isOpen: !chapter.isOpen } : chapter
      )
    );
  };

  const addTopic = (chapterId) => {
    const newTopic = {
      id: Date.now(),
      title: 'New Topic',
      description: '',
      content: '',
      attachments: [],
    };
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, topics: [...chapter.topics, newTopic] }
          : chapter
      )
    );
  };

  const handleInputChange = (chapterId, topicId, field, value) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              topics: chapter.topics.map((topic) =>
                topic.id === topicId ? { ...topic, [field]: value } : topic
              ),
            }
          : chapter
      )
    );
  };

  const editTopic = (chapterId, topicId) => {
    const newTitle = prompt('Enter new topic title:');
    if (newTitle) {
      handleInputChange(chapterId, topicId, 'title', newTitle);
    }
  };

  const deleteTopic = (chapterId, topicId) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              topics: chapter.topics.filter((topic) => topic.id !== topicId),
            }
          : chapter
      )
    );
  };


  const viewTopic = (topicTitle) => {
    alert(`Viewing topic: ${topicTitle}`);
  };

  const mapCourseToTopic = (courseId, chapterId, topicId) => {
    setCourseMappings((prevMappings) => [
      ...prevMappings,
      { courseId, chapterId, topicId },
    ]);
    alert(`Mapped Course ID ${courseId} to Chapter ID ${chapterId}, Topic ID ${topicId}`);
  };

  return (
    <div className="course-topics-container">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="chapter">
          <div className="chapter-header" onClick={() => toggleChapter(chapter.id)}>
            <span>{chapter.title}</span>
            <button className="add-topic-btn" onClick={() => addTopic(chapter.id)}>
              +
            </button>
          </div>
          {chapter.isOpen && (
            <div className="topics">
              {chapter.topics.map((topic) => (
                <div key={topic.id} className="topic-item">
                  <input
                    type="text"
                    value={topic.title}
                    onChange={(e) => handleInputChange(chapter.id, topic.id, 'title', e.target.value)}
                    placeholder="Topic Title"
                  />
                  <textarea
                    value={topic.description}
                    onChange={(e) => handleInputChange(chapter.id, topic.id, 'description', e.target.value)}
                    placeholder="Topic Description"
                  />
                  <textarea
                    value={topic.content}
                    onChange={(e) => handleInputChange(chapter.id, topic.id, 'content', e.target.value)}
                    placeholder="Topic Content"
                  />
                  <select
                    onChange={(e) => mapCourseToTopic(e.target.value, chapter.id, topic.id)}
                    defaultValue=""
                  >
                    <option value="" disabled>Select Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  <div className="topic-actions">
                    <button className="view-btn" onClick={() => viewTopic(topic.title)}>
                      👁️
                    </button>
                    <button className="edit-btn" onClick={() => editTopic(chapter.id, topic.id)}>
                      ✏️
                    </button>
                    <button className="delete-btn" onClick={() => deleteTopic(chapter.id, topic.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseTopics;
