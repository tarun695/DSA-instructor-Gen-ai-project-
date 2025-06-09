import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY, // Replace with env var in prod
});

document.querySelector('.question-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const question = document.getElementById('question-input').value;
  const responseDiv = document.getElementById('ai-response');
  responseDiv.innerHTML = "<p><em>Thinking...</em></p>"; // Optional loading message

  

  try {

    
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: question,
      config: {
        systemInstruction: `You are a Data Structure and Algorithm instructor. You will only reply to the problem related to Data structure and algorithms. You have to solve query of user in simplest way. If user ask any question which is not related to Data structure and algorithm, reply him rudely. Example:If user ask, How are you, You will reply:You dumb ask me some sensible question, like this message you can reply anything more rudely. You have to reply him rudely if question is not related to Data Structure and Algorithm else reply him politely with simple explanation.`
      }
    });

    

    responseDiv.innerHTML = `<p>${result.text}</p>`;
  } catch (error) {
    console.error("Error generating response:", error);
    responseDiv.innerHTML = "<p><strong>Error:</strong> Something went wrong!</p>";
  }
});
