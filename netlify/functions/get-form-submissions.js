// netlify/functions/get-form-submissions.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Retrieve your Netlify access token and site ID from environment variables
  const token = process.env.NETLIFY_ACCESS_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;
  // The form name (ID) is the name you gave your form in your HTML.
  const formId = "question-form"; 

  if (!token || !siteId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NETLIFY_ACCESS_TOKEN or NETLIFY_SITE_ID environment variables." }),
    };
  }

  try {
    // Construct the API URL to fetch submissions
    const url = `https://api.netlify.com/api/v1/forms/${formId}/submissions?site_id=${siteId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }
    
    const submissions = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(submissions)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
