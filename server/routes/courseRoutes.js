
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, level, search, sort } = req.query;
    const query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by level
    if (level) {
      query.level = level;
    }
    
    // Filter by search term (title or description)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only show published courses to the public
    query.status = 'published';
    
    // Sort options
    let sortOption = {};
    if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (sort === 'rating') {
      sortOption = { 'rating.average': -1 };
    } else {
      sortOption = { createdAt: -1 }; // Default sort by newest
    }
    
    const courses = await Course.find(query)
      .sort(sortOption)
      .populate('instructor', 'name avatar')
      .select('-lessons.content -enrolledStudents');
    
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio department')
      .populate('rating.reviews.user', 'name avatar');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new course (teacher or admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const {
      title,
      description,
      price,
      category,
      level,
      thumbnail
    } = req.body;
    
    const course = new Course({
      title,
      description,
      instructor: req.user.id,
      price,
      category,
      level,
      thumbnail,
      status: req.user.role === 'admin' ? 'published' : 'pending'
    });
    
    const savedCourse = await course.save();
    
    // Add course to instructor's created courses
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { createdCourses: savedCourse._id } }
    );
    
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a lesson to a course (owner or admin only)
router.post('/:id/lessons', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is the course instructor or an admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const {
      title,
      description,
      content,
      videoUrl,
      resources,
      quiz
    } = req.body;
    
    // Calculate the next order number
    const order = course.lessons.length > 0 
      ? Math.max(...course.lessons.map(lesson => lesson.order)) + 1 
      : 1;
    
    course.lessons.push({
      title,
      description,
      content,
      videoUrl,
      resources,
      quiz,
      order
    });
    
    const updatedCourse = await course.save();
    
    res.status(201).json(updatedCourse.lessons[updatedCourse.lessons.length - 1]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enroll in a course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is already enrolled
    const isEnrolled = course.enrolledStudents.some(
      enrollment => enrollment.student.toString() === req.user.id
    );
    
    if (isEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    // Add student to course's enrolled students
    course.enrolledStudents.push({
      student: req.user.id,
      progress: 0,
      completedLessons: [],
      lastLesson: 0
    });
    
    await course.save();
    
    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { enrolledCourses: course._id } }
    );
    
    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update course progress for enrolled student
router.put('/:id/progress', auth, async (req, res) => {
  try {
    const { lessonId, completed } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Find student enrollment
    const enrollmentIndex = course.enrolledStudents.findIndex(
      enrollment => enrollment.student.toString() === req.user.id
    );
    
    if (enrollmentIndex === -1) {
      return res.status(400).json({ message: 'Not enrolled in this course' });
    }
    
    const enrollment = course.enrolledStudents[enrollmentIndex];
    
    // Update completed lessons
    if (completed && !enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    } else if (!completed && enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons = enrollment.completedLessons.filter(id => id !== lessonId);
    }
    
    // Update last lesson
    enrollment.lastLesson = lessonId;
    
    // Calculate progress percentage
    enrollment.progress = (enrollment.completedLessons.length / course.lessons.length) * 100;
    
    // Save changes
    await course.save();
    
    res.json({
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
      lastLesson: enrollment.lastLesson
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a review to a course
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is enrolled in the course
    const isEnrolled = course.enrolledStudents.some(
      enrollment => enrollment.student.toString() === req.user.id
    );
    
    if (!isEnrolled) {
      return res.status(403).json({ message: 'Only enrolled students can leave reviews' });
    }
    
    // Check if user already left a review
    const existingReviewIndex = course.rating.reviews.findIndex(
      review => review.user.toString() === req.user.id
    );
    
    if (existingReviewIndex !== -1) {
      // Update existing review
      course.rating.reviews[existingReviewIndex].rating = rating;
      course.rating.reviews[existingReviewIndex].comment = comment;
      course.rating.reviews[existingReviewIndex].date = Date.now();
    } else {
      // Add new review
      course.rating.reviews.push({
        user: req.user.id,
        rating,
        comment
      });
    }
    
    // Update average rating
    const totalRating = course.rating.reviews.reduce((sum, review) => sum + review.rating, 0);
    course.rating.average = totalRating / course.rating.reviews.length;
    course.rating.count = course.rating.reviews.length;
    
    await course.save();
    
    res.json(course.rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
