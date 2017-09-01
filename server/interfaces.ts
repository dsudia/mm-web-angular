import { Request } from 'express';

export interface DatabaseTranslatorInner<T> {
  check: (s: T) => boolean;
  value: (s: T) => any;
}

export interface DatabaseTranslator<T> {
  [ key: string]: DatabaseTranslatorInner<T> | boolean | keyof T;
}

export interface StringKey {
  [key: string]: any;
}

export interface Registrant {
  id?: string;
  email: string;
  password: string;
  memberType: number;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

export interface Educator extends StringKey {
  displayName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  description: string;
}

export interface SecureRequest extends Request, Express.Request {
  user: {
    id: string;
    memberType: string;
  };
}

export interface UploadRequest extends SecureRequest {
  files: any;
}

export interface School extends StringKey {
  displayName: string;
  name: string;
  avatarUrl: string;
  description: string;
}

export interface MatchingProfile {
  id?: string;
  description?: string;
  memberId?: number;
  active?: boolean;
  ageRanges?: number[];
  ageRangesWeight?: number;
  calendars?: number[];
  calendarsWeight?: number;
  educationTypes?: number[];
  educationTypesWeight?: number;
  locationTypes?: number[];
  locationTypesWeight?: number;
  organizationTypes?: number[];
  organizationTypesWeight?: number;
  sizes: number[];
  sizesWeight: number;
  trainingTypes: number[];
  trainingTypesWeight: number;
  traits: number[];
  traitsWeight: number;
}

export interface SchoolMatchingProfile extends StringKey {
  id: number;
  schoolId: number;
  active: boolean;
  ageRanges: number[];
  ageRangesWgt: number;
  cals: number[];
  calsWgt: number;
  orgTypes: number[];
  orgTypesWgt: number;
  locTypes: number[];
  locTypesWgt: number;
  edTypes: number[];
  edTypesWgt: number;
  sizes: number[];
  sizesWgt: number;
  trainings: number[];
  trainingsWgt: number;
  traits: number[];
  traitsWgt: number;
  states: number[];
  statesWgt: number;
}

export interface Match extends StringKey {
  id: number;
  schoolMatchingProfileId: number;
  educatorId: number;
  percentage: number;
  educatorConfirmation: boolean;
  schoolConfirmation: boolean;
  educatorDenial: boolean;
  schoolDenial: boolean;
}
