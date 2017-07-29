import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export const dynamo = new AWS.DynamoDB.DocumentClient();

export const tables = {
  Matches: 'MontessoriMatchMatches',
  MatchingProfiles: 'MontessoriMatchMatchingProfiles',
  Members: 'MontessoriMatchMembers',
  Auth: 'MontessoriMatchMemberAuth',
  MatchesByEducator: 'MatchesByEducatorMatchingProfileId',
  MatchesBySchool: 'MatchesBySchoolMatchingProfileId'
}
