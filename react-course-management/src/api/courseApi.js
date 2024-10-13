// src/api/courseApi.js
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore'; // Ensure all necessary functions are imported
import { db } from '../firebase'; // Firestore instance

export const fetchPaginatedCourses = async (pageSize, lastVisible = null) => {
    const collectionRef = collection(db, 'courses');
    let q;

    if (lastVisible) {
        q = query(collectionRef, orderBy('name'), startAfter(lastVisible), limit(pageSize));
    } else {
        q = query(collectionRef, orderBy('name'), limit(pageSize));
    }

    const snapshot = await getDocs(q);
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lastCourse = snapshot.docs[snapshot.docs.length - 1]; // Last visible course

    return { courses, lastCourse };
};

// Updated version to fetch all courses and count them
export const getTotalCoursesCount = async () => {
    const collectionRef = collection(db, 'courses');
    const snapshot = await getDocs(collectionRef); // Get all docs in the collection
    return snapshot.size; // Use snapshot.size to get the total number of documents
};
