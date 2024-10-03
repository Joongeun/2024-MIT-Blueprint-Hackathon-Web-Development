var input;

const form = document.getElementById('chat-form');
const responseTextarea = document.getElementById('response');

const API_KEY = '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';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    input = "I want to eat " + document.getElementById("foodType").value + " food from " + document.getElementById("startDate").value
    + " to " + document.getElementById("endDate").value + " with " + document.getElementById("numOfMeals").value
    + " meals per day. Can you generate a daily meal plan for this period that includes cooking instructions and recipes? Make sure each meal is unique for every day in the specified period. Don't stop in the middle."
    + " Make it in format of: "
    + "\nmm/dd/yyyy 1. (food): Ingredients:food,food,food \n Cooking Instructions:Step1:stuff,Step2:stuff\n\nDo not include which meal of the day it is.";

    if (input) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: input }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
                console.log(responseTextarea.value);
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});