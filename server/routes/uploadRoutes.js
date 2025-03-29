
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const Course = require('../models/Course');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to accept only certain file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    'application/pdf', 
    'video/mp4', 
    'image/jpeg', 
    'image/png',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, MP4, JPEG, PNG, PPTX, and DOCX files are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max file size
});

// Upload course content (teacher or admin only)
router.post('/course-content/:courseId', auth, upload.single('file'), async (req, res) => {
  try {
    // Check if user is authorized (teacher or admin)
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const courseId = req.params.courseId;
    const { title, description, lessonId } = req.body;
    
    // Get the course
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is the course instructor or an admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }
    
    // Get the file information
    const file = req.file;
    const fileUrl = `/uploads/${file.filename}`;
    const fileType = file.mimetype;
    
    // If lessonId is provided, add resource to existing lesson
    if (lessonId) {
      const lessonIndex = course.lessons.findIndex(lesson => lesson._id.toString() === lessonId);
      
      if (lessonIndex === -1) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      
      // Add resource to lesson
      course.lessons[lessonIndex].resources.push({
        title: title || file.originalname,
        fileUrl,
        type: fileType
      });
    } else {
      // Create a new lesson with this content
      const newLessonOrder = course.lessons.length > 0 
        ? Math.max(...course.lessons.map(lesson => lesson.order)) + 1 
        : 1;
      
      let lessonContent = '';
      
      // For video content
      if (fileType.startsWith('video/')) {
        lessonContent = `<div class="video-content"><video controls><source src="${fileUrl}" type="${fileType}"></video></div>`;
      } else {
        lessonContent = `<div class="file-content"><p>Content available for download</p></div>`;
      }
      
      course.lessons.push({
        title: title || 'New Lesson',
        description: description || 'Lesson description',
        content: lessonContent,
        videoUrl: fileType.startsWith('video/') ? fileUrl : '',
        resources: [{
          title: title || file.originalname,
          fileUrl,
          type: fileType
        }],
        order: newLessonOrder,
        quiz: []
      });
    }
    
    await course.save();
    
    res.status(200).json({ 
      message: 'Content uploaded successfully',
      file: {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: fileUrl
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Get all uploaded content for a course
router.get('/course-content/:courseId', auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Collect all resources from all lessons
    const resources = course.lessons.flatMap(lesson => 
      lesson.resources.map(resource => ({
        ...resource.toObject(),
        lessonId: lesson._id,
        lessonTitle: lesson.title
      }))
    );
    
    res.json(resources);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a resource
router.delete('/course-content/:courseId/:lessonId/:resourceId', auth, async (req, res) => {
  try {
    const { courseId, lessonId, resourceId } = req.params;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is authorized
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Find the lesson
    const lessonIndex = course.lessons.findIndex(lesson => lesson._id.toString() === lessonId);
    
    if (lessonIndex === -1) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Find and remove the resource
    const resourceIndex = course.lessons[lessonIndex].resources.findIndex(
      resource => resource._id.toString() === resourceId
    );
    
    if (resourceIndex === -1) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    // Get file path to delete
    const fileUrl = course.lessons[lessonIndex].resources[resourceIndex].fileUrl;
    const filePath = path.join(__dirname, '..', fileUrl);
    
    // Remove resource from lesson
    course.lessons[lessonIndex].resources.splice(resourceIndex, 1);
    await course.save();
    
    // Delete file from filesystem (if it exists)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.json({ message: 'Resource deleted successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
