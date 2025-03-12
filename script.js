const API_KEY = "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"; // 🔹 Paste your Hugging Face API key here

async function fetchData() {
    const name = document.getElementById("query").value.trim();
    if (!name) {
        alert("Please enter a vegetable or fruit name.");
        return;
    }

    const prompt = `Provide detailed information about the fruit or vegetable: ${name}
    - Suitable soil type
    - Growth duration in days
    - Best marketplaces to sell
    - Common diseases and prevention
    - Any additional farming tips.`;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/flan-t5-large",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: prompt })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && data[0] && data[0].generated_text) {
            document.getElementById("response").innerText = data[0].generated_text;
        } else {
            document.getElementById("response").innerText = "No data found. Try another query.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response").innerText = "Error fetching data. Check console.";
    }
}
