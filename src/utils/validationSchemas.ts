/**
 * Validation Schemas for Forms
 * 
 * Provides validation functions for common form fields:
 * - Email validation
 * - First name / Last name (no leading spaces, proper format)
 * - Mobile number validation
 * - Password validation
 * - Date of birth validation
 * - No leading/trailing spaces validation
 */

export type ValidationError = string | undefined;

/**
 * Validates that a string has no leading or trailing spaces
 */
export const validateNoLeadingSpaces = (value: string | undefined): ValidationError => {
  if (!value) return undefined;
  if (value.trim() !== value) {
    return 'Field cannot have leading or trailing spaces';
  }
  return undefined;
};

/**
 * Validates email format
 */
export const validateEmail = (value: string | undefined): ValidationError => {
  if (!value) return 'Email is required';

  // Block ANY leading/trailing whitespace (spaces, tabs, unicode)
  if (/^\s+|\s+$/g.test(value)) {
    return 'Email cannot have leading or trailing spaces';
  }

  // Block domains starting with a number (e.g., 1.com)
  const emailRegex = /^[^\s@]+@[a-zA-Z][a-zA-Z0-9-]*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }

  return undefined;
};
/**
 * Validates first name
 */
export const validateFirstName = (value: string | undefined): ValidationError => {
  if (!value) return 'First name is required';
  if (value.trim() !== value) {
    return 'First name cannot have leading or trailing spaces';
  }
  if (value.trim().length < 2) {
    return 'First name must be at least 2 characters';
  }
  if (value.trim().length > 50) {
    return 'First name must be less than 50 characters';
  }
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(value.trim())) {
    return 'First name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return undefined;
};

/**
 * Validates last name
 */
export const validateLastName = (value: string | undefined): ValidationError => {
  if (!value) return 'Last name is required';
  if (value.trim() !== value) {
    return 'Last name cannot have leading or trailing spaces';
  }
  if (value.trim().length < 2) {
    return 'Last name must be at least 2 characters';
  }
  if (value.trim().length > 50) {
    return 'Last name must be less than 50 characters';
  }
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(value.trim())) {
    return 'Last name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return undefined;
};

/**
 * Validates mobile number
 * Supports international formats with optional country code
 */
export const validateMobileNumber = (value: string | undefined): ValidationError => {
  if (!value) return 'Mobile number is required';
  if (value.trim() !== value) {
    return 'Mobile number cannot have leading or trailing spaces';
  }
  // Remove spaces, dashes, parentheses, and plus signs for validation
  const cleaned = value.replace(/[\s\-()+]/g, '');
  // Should contain only digits and be between 10-15 digits
  if (!/^\d{10,15}$/.test(cleaned)) {
    return 'Please enter a valid mobile number (10-15 digits)';
  }
  return undefined;
};

/**
 * Validates password
 * Requirements: at least 8 characters, contains uppercase, lowercase, number, and special character
 */
export const validatePassword = (value: string | undefined): ValidationError => {
  if (!value) return 'Password is required';
  if (value.trim() !== value) {
    return 'Password cannot have leading or trailing spaces';
  }
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (value.length > 128) {
    return 'Password must be less than 128 characters';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/\d/.test(value)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    return 'Password must contain at least one special character';
  }
  return undefined;
};

/**
 * Validates date of birth
 * Must be a valid date and the person must be at least 13 years old
 */
export const validateDateOfBirth = (value: string | undefined): ValidationError => {
  if (!value) return 'Date of birth is required';
  if (value.trim() !== value) {
    return 'Date of birth cannot have leading or trailing spaces';
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return 'Please enter a valid date';
  }
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  const dayDiff = today.getDate() - date.getDate();
  const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  if (actualAge < 13) {
    return 'You must be at least 13 years old';
  }
  if (actualAge > 120) {
    return 'Please enter a valid date of birth';
  }
  if (date > today) {
    return 'Date of birth cannot be in the future';
  }
  return undefined;
};

/**
 * Formik-compatible validation function for login form
 */
export const validateLoginForm = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

/**
 * Formik-compatible validation function for registration form
 */
export const validateRegisterForm = (values: {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  password: string;
  mobileNumber?: string;
  dateOfBirth?: string;
}) => {
  const errors: Record<string, string> = {};

  // Handle both 'name' (single field) and 'firstName'/'lastName' (separate fields)
  if (values.firstName !== undefined) {
    const firstNameError = validateFirstName(values.firstName);
    if (firstNameError) errors.firstName = firstNameError;
  }

  if (values.lastName !== undefined) {
    const lastNameError = validateLastName(values.lastName);
    if (lastNameError) errors.lastName = lastNameError;
  }

  if (values.name !== undefined) {
    const nameError = validateFirstName(values.name);
    if (nameError) errors.name = nameError;
  }

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  if (values.mobileNumber !== undefined) {
    const mobileError = validateMobileNumber(values.mobileNumber);
    if (mobileError) errors.mobileNumber = mobileError;
  }

  if (values.dateOfBirth !== undefined) {
    const dobError = validateDateOfBirth(values.dateOfBirth);
    if (dobError) errors.dateOfBirth = dobError;
  }

  return errors;
};

/**
 * Validates OTP (6-digit code)
 */
export const validateOTP = (value: string | undefined): ValidationError => {
  if (!value) return 'OTP is required';
  if (value.trim() !== value) {
    return 'OTP cannot have leading or trailing spaces';
  }
  if (!/^\d{6}$/.test(value)) {
    return 'OTP must be exactly 6 digits';
  }
  return undefined;
};

/**
 * Validates password confirmation
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string | undefined
): ValidationError => {
  if (!confirmPassword) return 'Please confirm your password';
  if (confirmPassword.trim() !== confirmPassword) {
    return 'Password confirmation cannot have leading or trailing spaces';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return undefined;
};

/**
 * Formik-compatible validation function for forget password form
 */
export const validateForgetPasswordForm = (values: { email: string }) => {
  const errors: { email?: string } = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  return errors;
};

/**
 * Formik-compatible validation function for verify OTP form
 */
export const validateVerifyOTPForm = (values: { otp: string }) => {
  const errors: { otp?: string } = {};

  const otpError = validateOTP(values.otp);
  if (otpError) errors.otp = otpError;

  return errors;
};

/**
 * Formik-compatible validation function for reset password form
 */
export const validateResetPasswordForm = (values: { password: string; confirmPassword: string }) => {
  const errors: { password?: string; confirmPassword?: string } = {};

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validatePasswordConfirmation(values.password, values.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
};

