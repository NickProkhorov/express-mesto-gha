const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({ //здесь создаю как массив или сначала 1 карточку?
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {                    //нужно создавать модель owner?
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'likes',
    default: []               //как указать пустой массив по умолчанию?
  },
  createdAt: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('card', cardSchema);