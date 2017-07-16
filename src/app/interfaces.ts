export interface MatchingProfile {
    memberID: number;
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
    sizesWgt: number[];
    trainings: number[];
    trainingsWgt: number;
    traits: number[];
    traitsWgt: number;
    states: number[];
    statesWgt: number;
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
