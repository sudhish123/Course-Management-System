import React, { useState } from "react";
import "./CourseCreation.css";

const CourseCreationForm = ({ addCourse }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Data Management", 
    level: "Basic",
    description: "",
    faq: "",
    coverImage: null,
    salesVideo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage" || name === "salesVideo") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], 
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Title and Description are required.");
      return;
    }

    addCourse({ ...formData, id: Date.now() }); 

    setFormData({
      title: "",
      category: "Data Management",
      level: "Basic",
      description: "",
      faq: "",
      coverImage: null,
      salesVideo: null,
    });
  };

  return (
    <div className="course-creation-container">
      <h1>Create New Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="course-info-section">
          <h2>Course Information</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Introduction to Data Analysis"
              required 
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Data Management">Data Management</option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div className="form-group">
            <label>Level</label>
            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course description"
              maxLength={2000}
              required 
            ></textarea>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <input
            type="text"
            name="faq"
            value={formData.faq}
            onChange={handleChange}
            placeholder="e.g., Do you offer 1-on-1 calls?"
          />
        </div>

        <div className="upload-section">
          <div className="upload-group">
            <h3>Cover Image</h3>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="upload-group">
            <h3>Sales Video</h3>
            <input
              type="file"
              name="salesVideo"
              accept="video/*"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button">Save as Draft</button>
          <button type="submit">Save & Continue</button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreationForm;
