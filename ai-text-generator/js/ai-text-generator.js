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

        // OpenAI API Key (Replace with your actual OpenAI API key)
        var apiKey = "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"; // <-- Replace this with your real API key

        // Make the API call to generate AI text
        $.ajax({
            url: "https://api.openai.com/v1/completions", // OpenAI endpoint for text generation
            type: "POST",
            headers: {
                "Authorization": `Bearer ${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}`,  // Pass your OpenAI API key in the Authorization header
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                model: "text-davinci-003",  // You can use "gpt-4" for GPT-4, or another model
                prompt: userInput,          // The input text you want AI to generate from
                max_tokens: 100,            // Adjust token limit based on your needs
                temperature: 0.7,           // Control randomness of the output (0 to 1)
                top_p: 1,                   // Control diversity via nucleus sampling
                frequency_penalty: 0,       // Penalize repeating phrases (optional)
                presence_penalty: 0         // Penalize new topic changes (optional)
            }),
            success: function (data) {
                // Check if there is any generated text in the response
                if (data.choices && data.choices.length > 0) {
                    // Display the generated text
                    $('#generated-text').text(data.choices[0].text.trim());
                    
                    // Update word count
                    let wordCount = data.choices[0].text.trim().split(/\s+/).filter(word => word.length > 0).length;
                    $('#word-count').text("Word Count: " + wordCount);
                } else {
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
