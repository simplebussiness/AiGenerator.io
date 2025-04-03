$(document).ready(function () {
    // Handle form submission
    $('#ai-form').submit(function (e) {
        e.preventDefault();

        // Get user input
        var userInput = $('#user-input').val();

        // Check if input is empty
        if (userInput.trim() === "") {
            alert("Please enter a topic or description.");
            return;
        }

        // Show loading message while generating AI content
        $('#generated-text').text("Generating content, please wait...");

        // API Key placeholder - replace with your actual API key
        var apiKey = "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"; // <-- Replace this with your actual API key

        // Make the API call to generate AI text
        $.ajax({
            url: "https://api.cohere.ai/v1/generate", // API endpoint (change based on your provider)
            type: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,  // Pass your API key in the Authorization header
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                model: "command",  // Adjust model based on your provider's documentation
                prompt: userInput, // The input text you want AI to generate from
                max_tokens: 10000   // Adjust token limit as per your API provider's recommendations
            }),
            success: function (data) {
                if (data.generations && data.generations.length > 0) {
                    // Display the generated text
                    $('#generated-text').text(data.generations[0].text);
                } else {
                    // If no result is received
                    $('#generated-text').text("Error: No response received from AI.");
                }
            },
            error: function (error) {
                // Handle errors
                $('#generated-text').text("Error: Unable to generate text.");
                console.error("API Error:", error);
            }
        });
    });
});
