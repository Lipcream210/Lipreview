const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const dbPath = path.join(process.cwd(), 'questions.json');
    
    // Read existing questions
    let questions = {};
    if (fs.existsSync(dbPath)) {
      questions = JSON.parse(fs.readFileSync(dbPath));
    }
    
    // Add new question
    if (!questions[data.subject]) {
      questions[data.subject] = [];
    }
    questions[data.subject].push(data);
    
    // Save back to file
    fs.writeFileSync(dbPath, JSON.stringify(questions));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};