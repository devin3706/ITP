import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const teacherSchema = new Schema({
  
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nicNumber: {
    type: String,
    required: true,
    unique: true // Ensuring NIC number is unique
  },
  subject: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  eduQualification: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ // Ensuring phone number is in the format of 10 digits
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensuring email is unique
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length of 6 characters
  },
  // Adding a field for photo, which will store the binary data of the photo
  photo: {
    data: Buffer, // Binary data of the photo
    contentType: String // Mime type of the photo
  }
});

// Middleware to hash the password before saving
teacherSchema.pre('save', async function(next) {
  const teacher = this;
  if (!teacher.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(teacher.password, 10); // Hash the password with a salt factor of 10
    teacher.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const Teacher = model('Teacher', teacherSchema);
export default Teacher;
