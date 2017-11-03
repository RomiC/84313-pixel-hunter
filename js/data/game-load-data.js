const typeQuestionAdapt = {
  'two-of-two': `TWO_PIC`,
  'tinder-like': `ONE_PIC`,
  'one-of-three': `ONE_ANSWER`
};

const typeAnswerAdapt = {
  painting: `paint`,
  photo: `photo`
};

const adapterQuestions = (questions) => {
  let adapted = {};

  Object.keys(questions).forEach((it, i) => {
    const level = questions[it];
    const typeOfLevel = typeQuestionAdapt[level.type];

    let question = {};
    question.type = typeOfLevel;

    if (typeOfLevel === typeQuestionAdapt[`two-of-two`] || typeOfLevel === typeQuestionAdapt[`tinder-like`]) {
      question.options = [];
      level.answers.forEach((answer) => {
        question.options.push({
          question: answer.image.url,
          answer: typeAnswerAdapt[answer.type]
        });
      });
    } else {
      question.options = new Set();
      const amountTypePainting = level.answers.filter((answer) => answer.type === `painting`).length;
      const typeWinAnswer = (amountTypePainting === 1) ? `painting` : `photo`;
      level.answers.forEach((answer) => {
        question.options.add(answer.image.url);
        if (answer.type === typeWinAnswer) {
          question.answer = answer.image.url;
          question.typeAnswer = typeAnswerAdapt[typeWinAnswer];
        }
      });
    }

    adapted[i] = question;
  });

  return adapted;
};

export const uploadGameQuestions = () => {
  return fetch(`https://es.dump.academy/pixel-hunter/questions`, {
    method: `get`
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
  }).then((data) => adapterQuestions(data)).catch((err) => {
    throw new Error(`Ошибка: ${err.message}`);
  });
};
