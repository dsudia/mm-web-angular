import { ErrorResponse } from '../interfaces';

// Request Errors
export const BadLogin: ErrorResponse = {
  code: 1000,
  message: 'email or password was invalid'
};

export const MissingParameters: ErrorResponse = {
  code: 1001,
  message: 'missing parameters in request'
};

export const InvalidToken: ErrorResponse = {
  code: 1002,
  message: 'authorization token is invalid'
};

export const InvalidParameters: ErrorResponse = {
  code: 1003,
  message: 'parameters violate rules'
};

export const MissingAvatar: ErrorResponse = {
  code: 1004,
  message: 'no file was included'
};

// Database Errors
export const FindMemberFailure: ErrorResponse = {
  code: 2000,
  message: 'could not locate member in the database.'
};

export const InsertMemberFailure: ErrorResponse = {
  code: 2001,
  message: 'error inserting new member into database'
};

export const UpdatePasswordFailure: ErrorResponse = {
  code: 2002,
  message: 'error updating member password'
};

export const FindEducatorFailure: ErrorResponse = {
  code: 2003,
  message: 'could not locate educator profile'
};
export const FindSchoolFailure: ErrorResponse = {
  code: 2004,
  message: 'could not locate educator profile'
};

export const S3Error: ErrorResponse = {
  code: 2005,
  message: 'error uploading image to storage'
}
