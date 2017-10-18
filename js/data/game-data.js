const initialGame = Object.freeze({
  level: 0,
  lives: 3,
  time: 0,
  stats: []
});

const levels = [
  {
    type: `2pic`,
    options: {
      question1: `http://i.imgur.com/1KegWPz.jpg`,
      question2: `https://k42.kn3.net/CF42609C8.jpg`
    },
    answers: {
      question1: `photo`,
      question2: `paint`
    }
  },
  {
    type: `1pic`,
    img: `https://k42.kn3.net/D2F0370D6.jpg`,
    answer: `paint`
  },
  {
    type: `paint`,
    options: new Set([`https://i.imgur.com/DiHM5Zb.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`, `http://i.imgur.com/DKR1HtB.jpg`]),
    answer: `https://k32.kn3.net/5C7060EC5.jpg`
  },



  {
    type: `2pic`,
    options: {
      question1: `http://i.imgur.com/1KegWPz.jpg`,
      question2: `https://k42.kn3.net/CF42609C8.jpg`
    },
    answers: {
      question1: `photo`,
      question2: `paint`
    }
  },
  {
    type: `1pic`,
    img: `https://k42.kn3.net/D2F0370D6.jpg`,
    answer: `paint`
  },
  {
    type: `paint`,
    options: new Set([`https://i.imgur.com/DiHM5Zb.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`, `http://i.imgur.com/DKR1HtB.jpg`]),
    answer: `https://k32.kn3.net/5C7060EC5.jpg`
  },



  {
    type: `2pic`,
    options: {
      question1: `http://i.imgur.com/1KegWPz.jpg`,
      question2: `https://k42.kn3.net/CF42609C8.jpg`
    },
    answers: {
      question1: `photo`,
      question2: `paint`
    }
  },
  {
    type: `1pic`,
    img: `https://k42.kn3.net/D2F0370D6.jpg`,
    answer: `paint`
  },
  {
    type: `paint`,
    options: new Set([`https://i.imgur.com/DiHM5Zb.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`, `http://i.imgur.com/DKR1HtB.jpg`]),
    answer: `https://k32.kn3.net/5C7060EC5.jpg`
  },

  {
    type: `1pic`,
    img: `https://k42.kn3.net/D2F0370D6.jpg`,
    answer: `paint`
  }
];

export {initialGame, levels};
