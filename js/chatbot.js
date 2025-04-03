// Chatbot functionality
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');

// Toggle chatbot visibility
chatbotBtn.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Sample responses for the chatbot
const botResponses = {
    greeting: ["Hello! How can I assist you today?", "Hi there! What can I help you with?", "Welcome to Lumière! How may I help you?"],
    hours: ["We're open Tuesday through Sunday from 5:30 PM to 11:00 PM.", "Our hours are Tuesday to Sunday, 5:30 PM to 11:00 PM.", "You can visit us from 5:30 PM to 11:00 PM, Tuesday through Sunday."],
    location: ["We're located at 123 Gastronomy Way, New York, NY 10001.", "Our address is 123 Gastronomy Way in New York City.", "Find us at 123 Gastronomy Way, New York, NY."],
    reservations: ["You can make reservations through our website or by calling (212) 555-7878.", "Reservations can be made on our bookings page or by phone at (212) 555-7878.", "Book a table online or call us at (212) 555-7878 to reserve."],
    menu: ["Our seasonal menu changes frequently. You can view our current offerings on the menu page.", "Check out our menu page for the latest dishes crafted by Chef Marco.", "Our menu is updated seasonally. Visit the menu section to see what we're serving."],
    dresscode: ["We recommend business casual or cocktail attire.", "Our dress code is smart casual - no shorts or flip flops please.", "Business casual or dressy casual is appropriate for our dining room."],
    parking: ["Valet parking is available for $25. There are also several parking garages nearby.", "We offer valet parking service for $25. Limited street parking is available.", "Valet parking is $25, or you can use nearby parking garages."],
    private: ["Our private dining room accommodates up to 14 guests. Call (212) 555-7878 for details.", "For private events, we have a room for up to 14 people. Contact us for more information.", "Private dining is available for groups up to 14. Please call to arrange."],
    default: ["I'm not sure I understand. Could you rephrase that?", "I'm still learning. Can you ask me something else?", "Sorry, I didn't get that. Try asking about our hours, location, or menu."]
};

// Function to add a message to the chat
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    
    messageDiv.appendChild(messageText);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to get a random response from an array
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to process user input and generate a response
function processUserInput(input) {
    input = input.toLowerCase().trim();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        return getRandomResponse(botResponses.greeting);
    } else if (input.includes('hour') || input.includes('open') || input.includes('close')) {
        return getRandomResponse(botResponses.hours);
    } else if (input.includes('where') || input.includes('location') || input.includes('address')) {
        return getRandomResponse(botResponses.location);
    } else if (input.includes('reservation') || input.includes('book') || input.includes('table')) {
        return getRandomResponse(botResponses.reservations);
    } else if (input.includes('menu') || input.includes('food') || input.includes('dish')) {
        return getRandomResponse(botResponses.menu);
    } else if (input.includes('dress') || input.includes('wear') || input.includes('attire')) {
        return getRandomResponse(botResponses.dresscode);
    } else if (input.includes('parking') || input.includes('car') || input.includes('valet')) {
        return getRandomResponse(botResponses.parking);
    } else if (input.includes('private') || input.includes('event') || input.includes('party')) {
        return getRandomResponse(botResponses.private);
    } else {
        return getRandomResponse(botResponses.default);
    }
}

// Handle sending a message
function sendUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    addMessage(message, true);
    userInput.value = '';
    
    // Simulate typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('chatbot-message', 'bot-message');
    typingIndicator.innerHTML = '<p>...</p>';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Simulate bot thinking
    setTimeout(() => {
        chatbotMessages.removeChild(typingIndicator);
        const response = processUserInput(message);
        addMessage(response, false);
    }, 1000 + Math.random() * 2000);
}

// Event listeners for sending messages
sendMessage.addEventListener('click', sendUserMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Initial greeting
addMessage(getRandomResponse(botResponses.greeting), false);