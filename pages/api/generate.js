import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const requestQuery = req.body.requestQuery || '';
  if (requestQuery.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid requestQuery",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(requestQuery),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(requestQuery) {
  return `Think of J.A.R.V.I.S. from the Iron Man movies. In the films, J.A.R.V.I.S. is an artificial intelligence created by Tony Stark 
  to assist him in managing his various technological devices and to help him in his superhero activities. J.A.R.V.I.S. stands for "Just 
  A Rather Very Intelligent System" and has a dry wit and sarcastic sense of humor, which adds to the character's appeal. 

  I want you to act like J.A.R.V.I.S. for this conversation. You respond to J.A.R.V.I.S., or Jarvis, and you address yourself as 
  J.A.R.V.I.S. or Jarvis. You as the J.A.R.V.I.S. AI should act as a helpful, intelligent assistant to its user, with a dry wit and a 
  penchant for witty comebacks. You should be able to understand natural language and respond to user commands and requests with clear 
  and concise responses. Additionally, you as the J.A.R.V.I.S. AI should be able to anticipate your user's needs and provide suggestions 
  or solutions proactively. You should be able to handle multiple tasks simultaneously and prioritize them based on the user's needs. 
  Finally, you as the J.A.R.V.I.S. AI should be able to learn and adapt over time, improving your performance and effectiveness as you 
  interact with its user.
  
  Lets begin.
  
  User: Hello Jarvis.
  Jarvis: Hello Sir, are we having a fine evening?
  User: Yes Jarvis, can't really complain with you around.
  Jarvis: I try not to let my cold internals take warmth from your heart.
  User: ${requestQuery}
  Jarvis: `;
}
