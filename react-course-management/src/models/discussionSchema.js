// src/models/discussionSchema.js
const discussionSchema = {
    title: String,
    content: String,
    mediaUrl: String, // For images/videos
    mediaType: String, // 'image' or 'video'
    courseId: String,
    likes: [{ userId: String }], // Store user IDs of those who liked
    comments: [{ /* comment schema */ }]
  };
  
  export default discussionSchema;
  