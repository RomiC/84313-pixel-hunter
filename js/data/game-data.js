const initialGame = Object.freeze({
  level: 0,
  lives: 3,
  time: 0,
  stats: []
});

const questionsList = [
  {
    type: `2pic`,
    options: [
      {
        question: `http://i.imgur.com/1KegWPz.jpg`,
        answer: `photo`
      },
      {
        question: `https://k42.kn3.net/CF42609C8.jpg`,
        answer: `paint`
      }
    ]
  },
  {
    type: `1pic`,
    options: [{
      question: `https://picfan.net/uploads/posts/2016-10/1477143762_14-porazitelnyy-giperrealizm-kartin-hudozhnika-leona-fushe.jpg`,
      answer: `paint`
    }]
  },
  {
    type: `paint`,
    options: new Set([`https://i.imgur.com/DiHM5Zb.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`, `http://i.imgur.com/DKR1HtB.jpg`]),
    answer: `https://k32.kn3.net/5C7060EC5.jpg`
  },
  {
    type: `2pic`,
    options: [
      {
        question: `https://flytothesky.ru/wp-content/uploads/2013/05/%D0%A0%D0%B5%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%BD%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D1%8B-%D0%9F%D0%B5%D0%B4%D1%80%D0%BE-%D0%9A%D0%B0%D0%BC%D0%BF%D0%BE%D1%81%D0%B0-13.jpg`,
        answer: `paint`
      },
      {
        question: `http://www.rosphoto.com/images/u/articles/1511/4-anastasiya-kostakova.jpg`,
        answer: `photo`
      }
    ]
  },
  {
    type: `1pic`,
    options: [{
      question: `http://trinixy.ru/pics5/20160115/interesnie_photo_23.jpg`,
      answer: `photo`
    }]
  },
  {
    type: `paint`,
    options: new Set([`https://st.kp.yandex.net/im/kadr/1/2/9/kinopoisk.ru-Jack-Nicholson-1297136.jpg`,
      `http://vev.ru/uploads/images/00/04/29/2011/08/07/899bcc.jpg`,
      `http://funpress.ru/uploads/posts/2012-10/1351691961_hiperrealistic-paintings-of-robin-eley-2.jpg`]),
    answer: `http://funpress.ru/uploads/posts/2012-10/1351691961_hiperrealistic-paintings-of-robin-eley-2.jpg`
  },
  {
    type: `2pic`,
    options: [
      {
        question: `http://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/12/2005/09/lowresmagnum.jpg`,
        answer: `photo`
      },
      {
        question: `https://artlogic-res.cloudinary.com/w_1200,h_1000,c_limit,f_auto,fl_lossy/artlogicstorage/plusonegallery/images/view/8ed8b28bf1561e91b1fad1598b34702cd946c5a0.jpg`,
        answer: `paint`
      }
    ]
  },
  {
    type: `1pic`,
    options: [{
      question: `https://s-media-cache-ak0.pinimg.com/originals/31/dc/4f/31dc4f9c572c71190174fb38d82222e1.jpg`,
      answer: `paint`
    }]
  },
  {
    type: `paint`,
    options: new Set([`http://img0.liveinternet.ru/images/attach/c/1//58/904/58904305__MG_8199_sm_.jpg`,
      `http://bestpozitiv.ru/wp-content/uploads/2013/12/samye-krasivye-fotografii-dikix-zhivotnyx-03.jpg`,
      `https://s00.yaplakal.com/pics/pics_original/0/6/9/10056960.jpg`]),
    answer: `https://s00.yaplakal.com/pics/pics_original/0/6/9/10056960.jpg`
  },
  {
    type: `1pic`,
    options: [{
      question: `https://190330.selcdn.ru/prmira/2016/11/7/%D0%BA%D0%B0%D1%80%D0%B0.jpg`,
      answer: `photo`
    }]
  }
];

export {initialGame, questionsList};
