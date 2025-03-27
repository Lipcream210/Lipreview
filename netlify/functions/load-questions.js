const questions = require('../../questions.json');
exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(questions)
  };
};