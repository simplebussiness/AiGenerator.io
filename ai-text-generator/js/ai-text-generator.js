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

        // Make the API call to generate AI text
        $.ajax({
            url: "/generate-text",  // Endpoint on the backend to generate text
            type: "POST",
            data: JSON.stringify({ prompt: userInput }),
            contentType: "application/json",
            success: function (data) {
                // Display the generated text
                if (data.text) {
                    $('#generated-text').text(data.text.trim());

                    // Update word count
                    let wordCount = data.text.trim().split(/\s+/).filter(word => word.length > 0).length;
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

