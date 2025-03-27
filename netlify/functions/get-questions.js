const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const dbPath = path.join(process.cwd(), 'questions.json');
    
    if (!fs.existsSync(dbPath)) {
      return { statusCode: 200, body: JSON.stringify({}) };
    }
    
    const questions = JSON.parse(fs.readFileSync(dbPath));
    return {
      statusCode: 200,
      body: JSON.stringify(questions)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};