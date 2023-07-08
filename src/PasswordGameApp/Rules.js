const RULES = [
  {
    alias: '5long',
    title: 'Rule 1',
    message: "Password must be at least 5 characters long.",
    fails: (password) => {
      return password.length < 5;
    },
  },
  {
    alias: 'capital',
    title: 'Rule 2',
    message: "You must have at least one capital letter",
    fails: (password) => {
      return password.toLowerCase() === password;
    },
  },
  {
    alias: 'number',
    title: 'Rule 3',
    message: "You must have at least one number.",
    fails: (password) => {
      return !password.match(new RegExp(/\d/));
    },
  },
  {
    alias: '20 long',
    title: 'Rule 4',
    message: "Password must be at least 20 characters long.",
    fails: (password) => {
      return password.length < 20;
    },
  },
  {
    alias: 'planet name',
    title: 'Rule 5',
    message: "Password must contain a name of a planet.",
    fails: (password) => {
      const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
      return planets
        .map(p => password.toLowerCase().includes(p))
        .filter(b => b)
        .length === 0;
    },
  },
];

export default RULES;
