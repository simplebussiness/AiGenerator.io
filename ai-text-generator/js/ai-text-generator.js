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

        // Make the API call to the Glitch backend
        $.ajax({
            url: "https://ai-text-generator-backend.glitch.me/generate-text",  // Your Glitch backend URL
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ prompt: userInput }),
            success: function (data) {
                // Display the generated text
                $('#generated-text').text(data.generatedText);
            },
            error: function (error) {
                // Handle errors
                $('#generated-text').text("Error: Unable to generate text.");
                console.error("API Error:", error);
            }
        });
    });
});
