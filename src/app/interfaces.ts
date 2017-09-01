export interface MatchingProfile {
    id?: string;
    description?: string;
    memberID?: number;
    ageRanges?: number[];
    ageRangesWgt?: number;
    calendars?: number[];
    calendarsWgt?: number;
    organizationTypes?: number[];
    organizationTypesWgt?: number;
    locationTypes?: number[];
    locationTypesWgt?: number;
    edTypes?: number[];
    edTypesWgt?: number;
    sizes?: number[];
    sizesWgt?: number[];
    trainingTypes?: number[];
    trainingTypesWgt?: number;
    traits?: number[];
    traitsWgt?: number;
    states?: number[];
    statesWgt?: number;
}

export interface Member {
  memberType: number;
  id: string;
  displayName?: string;
  active?: boolean;
  avatarUrl?: string;
  matchingProfile?: MatchingProfile;
}

export interface EducatorBasics {
  firstName?: string;
  lastName?: string;
  description?: string;
  avatarUrl?: string;
}

export interface Educator extends Member, EducatorBasics {
  email: string;
}

export interface SchoolBasics {
  name?: string;
  description?: string;
  avatarUrl?: string;
}

export interface School extends Member, SchoolBasics { }

export interface UserState {
  memberType: string;
  user: Educator | School;
}
