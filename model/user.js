const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book 에서 사용할 서브다큐먼트의 스키마입니다.
const User = new Schema({
    userName: String,
    password: String,
    address: String,
    keyStore: String
});

// 스키마를 모델로 변환하여, 내보내기 합니다.
module.exports = mongoose.model('User', User);