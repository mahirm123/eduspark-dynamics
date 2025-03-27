
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: ''
  },
  resources: [{
    title: String,
    fileUrl: String,
    type: String
  }],
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }],
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  lessons: [lessonSchema],
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    progress: {
      type: Number,
      default: 0
    },
    completedLessons: [{
      type: Number
    }],
    lastLesson: {
      type: Number,
      default: 0
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: Number,
      comment: String,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'rejected'],
    default: 'draft'
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
