exports.seed = function(knex, Promise) {
  return knex('traits').insert([
      {id: 0, name: 'Ambitious'},
      {id: 1, name: 'Humorous'},
      {id: 2, name: 'Collaborative'},
      {id: 3, name: 'Independent'},
      {id: 4, name: 'Extroverted'},
      {id: 5, name: 'Introverted'},
      {id: 6, name: 'Artistic'},
      {id: 7, name: 'Musical'},
      {id: 8, name: 'Creative'},
      {id: 9, name: 'Organized'},
      {id: 10, name: 'Playful'},
      {id: 11, name: 'Quiet'},
      {id: 12, name: 'Verbal Communicator'},
      {id: 13, name: 'Written Communicator'},
      {id: 14, name: 'Joyful'},
      {id: 15, name: 'Techie'},
      {id: 16, name: 'Analog'},
      {id: 17, name: 'Patient'},
      {id: 18, name: 'Spontaneous'},
      {id: 19, name: 'Routine Oriented'},
  ]);
};
