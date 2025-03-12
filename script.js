const API_KEY = "AIzaSyCI8Px_VlbbDvd77tzKAwF1ydgikTuVH0c";  // Paste your Gemini API key here

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let responseDiv = document.getElementById("response");

    responseDiv.innerHTML = "Fetching data... ⏳";

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

    const requestBody = {
        contents: [{ parts: [{ text: `Give me details about ${userInput}: Suitable soil type, Growth duration, Best marketplaces to sell.` }] }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            responseDiv.innerHTML = `<strong>Response:</strong> ${data.candidates[0].content.parts[0].text}`;
        } else {
            responseDiv.innerHTML = "No data found. Try again!";
        }
    } catch (error) {
        responseDiv.innerHTML = "Error fetching data. Check your API key and console.";
        console.error("API Error:", error);
    }
}
