exports.seed = function(knex, Promise) {
  return knex('traits').insert([
      {id: 1, name: 'Ambitious'},
      {id: 2, name: 'Humorous'},
      {id: 3, name: 'Collaborative'},
      {id: 4, name: 'Independent'},
      {id: 5, name: 'Extroverted'},
      {id: 6, name: 'Introverted'},
      {id: 7, name: 'Artistic'},
      {id: 8, name: 'Musical'},
      {id: 9, name: 'Creative'},
      {id: 10, name: 'Organized'},
      {id: 11, name: 'Playful'},
      {id: 12, name: 'Quiet'},
      {id: 13, name: 'Verbal Communicator'},
      {id: 14, name: 'Written Communicator'},
      {id: 15, name: 'Joyful'},
      {id: 16, name: 'Techie'},
      {id: 17, name: 'Analog'},
      {id: 18, name: 'Patient'},
      {id: 19, name: 'Spontaneous'},
      {id: 20, name: 'Routine Oriented'}
  ]);
};
