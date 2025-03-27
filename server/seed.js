
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edulearn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Platform administrator with extensive background in education technology.',
    department: 'Administration'
  },
  {
    name: 'Teacher One',
    email: 'teacher1@example.com',
    password: 'password123',
    role: 'teacher',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Experienced teacher specializing in computer science and mathematics.',
    department: 'Computer Science'
  },
  {
    name: 'Student One',
    email: 'student1@example.com',
    password: 'password123',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Enthusiastic learner passionate about technology and programming.',
    department: 'Engineering'
  }
];

// Function to seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Create users
    const createdUsers = {};
    
    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      
      const savedUser = await user.save();
      createdUsers[userData.role] = savedUser;
      console.log(`Created ${userData.role} user: ${userData.email}`);
    }
    
    // Create sample courses
    const courses = [
      {
        title: 'Introduction to Web Development',
        description: 'Learn the basics of HTML, CSS, and JavaScript to build your first website.',
        instructor: createdUsers.teacher._id,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        price: 49.99,
        category: 'Web Development',
        level: 'beginner',
        status: 'published',
        lessons: [
          {
            title: 'HTML Fundamentals',
            description: 'Understanding the building blocks of web pages',
            content: '<p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p>',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1,
            resources: [
              {
                title: 'HTML Cheat Sheet',
                fileUrl: 'https://websitesetup.org/wp-content/uploads/2019/08/HTML-CHEAT-SHEET.pdf',
                type: 'pdf'
              }
            ],
            quiz: [
              {
                question: 'What does HTML stand for?',
                options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
                correctAnswer: 0
              }
            ]
          },
          {
            title: 'CSS Styling',
            description: 'Making your websites look beautiful',
            content: '<p>CSS (Cascading Style Sheets) is used to style and lay out web pages.</p>',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 2,
            resources: [
              {
                title: 'CSS Cheat Sheet',
                fileUrl: 'https://websitesetup.org/wp-content/uploads/2019/11/wsu-css-cheat-sheet-gdocs.pdf',
                type: 'pdf'
              }
            ],
            quiz: [
              {
                question: 'Which property is used to change the background color?',
                options: ['color', 'bgcolor', 'background-color', 'background'],
                correctAnswer: 2
              }
            ]
          }
        ]
      },
      {
        title: 'Advanced JavaScript Concepts',
        description: 'Dive deep into JavaScript with topics like closures, promises, and async programming.',
        instructor: createdUsers.teacher._id,
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a',
        price: 79.99,
        category: 'Programming',
        level: 'intermediate',
        status: 'published',
        lessons: [
          {
            title: 'Closures and Scope',
            description: 'Understanding JavaScript closures and variable scope',
            content: '<p>A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).</p>',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1,
            resources: [
              {
                title: 'JavaScript Closures Explained',
                fileUrl: 'https://example.com/closures.pdf',
                type: 'pdf'
              }
            ],
            quiz: [
              {
                question: 'What is a closure in JavaScript?',
                options: [
                  'A way to close the browser window',
                  'A function with access to its own scope, the outer function's scope, and global variables',
                  'A method to restrict variable access',
                  'A way to end a loop'
                ],
                correctAnswer: 1
              }
            ]
          }
        ]
      }
    ];
    
    for (const courseData of courses) {
      const course = new Course(courseData);
      const savedCourse = await course.save();
      console.log(`Created course: ${courseData.title}`);
      
      // Add course to teacher's created courses
      await User.findByIdAndUpdate(
        createdUsers.teacher._id,
        { $push: { createdCourses: savedCourse._id } }
      );
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
