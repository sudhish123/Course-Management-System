import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Auth from './Auth';
import Logout from './Logout';
import CourseCreation from './CourseCreation';
import ChapterTopicCreation from './ChapterTopicCreation';
import CourseMapping from './CourseMapping';
import DiscussionList from './DiscussionList';
import { auth } from './firebase';
import './App.css'; 
import CreateDiscussion from './CreateDiscussion';
import DiscussionDetails from './DiscussionDetail';
import CourseList from './components/CourseList'; 
import CourseDetail from './CourseDetail'; 
import MappingOverview from './MappingOverview'; 

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]); 
    const courseId = 'exampleCourseId'; 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const addCourse = (courseData) => {
        setCourses((prevCourses) => [...prevCourses, courseData]);
        console.log('New Course Added:', courseData); 
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <Router>
            <div className="app-container">
                {user && <NavBar user={user} />}
                <div className="app-content">
                    {user && <Sidebar user={user} />}
                    <div className="main-section">
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={user ? <Navigate to="/create-course" /> : <Auth />} /> {/* Changed this line */}
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/create-course" element={user ? <CourseCreation addCourse={addCourse} /> : <Navigate to="/" />} />
                                <Route path="/create-chapter-topic" element={user ? <ChapterTopicCreation /> : <Navigate to="/" />} />
                                <Route path="/map-course" element={user ? <CourseMapping /> : <Navigate to="/" />} />
                                <Route path="/discussions" element={user ? <DiscussionList courseId={courseId} user={user} /> : <Navigate to="/" />} />
                                <Route path="/create-discussion" element={user ? <CreateDiscussion courseId={courseId} /> : <Navigate to="/" />} />
                                <Route path="/discussion/:courseId/:discussionId" element={user ? <DiscussionDetails /> : <Navigate to="/" />} />
                                <Route path="/courses" element={user ? <CourseList courses={courses} /> : <Navigate to="/" />} /> {/* Pass courses here */}
                                <Route path="/courses/:courseId" element={user ? <CourseDetail courses={courses} /> : <Navigate to="/" />} />
                                <Route path="/mapping-overview" element={user ? <MappingOverview /> : <Navigate to="/" />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </Router>
    );
};

const NavBar = ({ user }) => {
    return (
        <nav className="navbar" style={{ color: "black", backgroundColor: "white", display: "flex", flexDirection: "row", alignItems: "flex-end", padding: "1rem" }}>
            {user && <h2 className="welcome-message">Welcome, {user.displayName}</h2>}
            <div className="navbar-user-info">
                {user && user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="profile"
                        className="profile-image"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                    />
                ) : (
                    <img
                        src="https://via.placeholder.com/150"
                        alt="default profile"
                        className="profile-image"
                    />
                )}
                <p>Email: {user.email}</p>
            </div>
        </nav>
    );
};

const Sidebar = ({ user }) => {
    return (
        <aside className="sidebar" style={{ backgroundColor: "white", color: "black", display: "flex", flexDirection: "column", height: "100vh" }}>
            <h2>Sidebar</h2>
            <ul style={{ flex: 1 }}>
                <li><Link style={{ color: "black" }} to="/create-course">Create New Course</Link></li>
                <li><Link style={{ color: "black" }} to="/create-chapter-topic">Create Chapters/Topics</Link></li>
                <li><Link style={{ color: "black" }} to="/map-course">Course Mapping</Link></li>                
                <li><Link style={{ color: "black" }} to="/courses">All Courses</Link></li>
                <li><Link style={{ color: "black" }} to="/create-discussion" >Create Discussion</Link></li>
                <li><Link style={{ color: "black" }} to="/discussions">All Discussions</Link></li>
                <li><Link style={{ color: "black" }} to="/mapping-overview">Course Mapping Overview</Link></li>
            </ul>

            <div style={{
                color: "black",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "1rem",
                position: "sticky",
                bottom: "10px"
            }} className="navbar-footer">
                <p className="username">{user.displayName}</p>
                <button>
                    <Link style={{ color: "black", textDecoration: "none" }} to="/logout" className="logout-button">Logout</Link>
                </button>
            </div>
        </aside>
    );
};

export default App;
