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

export interface Educator {
    memberType: string;
    id: number;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    avatarURL: string;
    description: string;
    matchingProfile: MatchingProfile;
}

export interface School {
    memberType: string;
    id: number;
    displayName: string;
    name: string;
    active: boolean;
    avatarURL: string;
    description: string;
    matchingProfiles: MatchingProfile[];
}

export interface UserState {
  memberType: string;
  user: Educator | School;
}
