document.addEventListener('DOMContentLoaded', function() {
    // Chatbot elements
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    // Training data for the chatbot
    const trainingData = {
        greetings: {
            patterns: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
            responses: [
                "Hello! Welcome to LightWeight Restaurant. How can I assist you today?",
                "Hi there! How can I help you with your dining experience?",
                "Greetings! What can I do for you today?"
            ]
        },
        menu: {
            patterns: ["menu", "food", "dishes", "what do you serve", "offer"],
            responses: [
                "We offer a variety of gourmet dishes made with locally-sourced ingredients. You can view our full menu on the Menu page.",
                "Our menu features seasonal dishes with options for all dietary preferences. Check out our Menu section for details.",
                "From starters to desserts, we have something for everyone. Visit our Menu page to see all options."
            ]
        },
        reservations: {
            patterns: ["reservation", "book a table", "reserve", "booking", "table"],
            responses: [
                "You can make a reservation through our Reservations page. How many people will be joining you?",
                "We'd love to have you! Visit our Reservations page to book your table.",
                "For reservations, please use our online booking system on the Reservations page."
            ]
        },
        hours: {
            patterns: ["open", "hours", "time", "close", "operating hours"],
            responses: [
                "We're open:\nMonday-Friday: 11:00 AM - 11:00 PM\nSaturday: 10:00 AM - 12:00 AM\nSunday: 10:00 AM - 10:00 PM",
                "Our hours are:\nWeekdays: 11AM-11PM\nSaturday: 10AM-Midnight\nSunday: 10AM-10PM",
                "You can visit us:\nMon-Fri: 11AM to 11PM\nSat: 10AM to Midnight\nSun: 10AM to 10PM"
            ]
        },
        location: {
            patterns: ["where", "location", "address", "find you", "map"],
            responses: [
                "We're located at 123 Gourmet Street, Foodville. You can find us on the map in the Contact section.",
                "Our address is 123 Gourmet Street, Foodville. Check our Contact page for directions.",
                "You'll find us at 123 Gourmet Street. The map on our Contact page will help you locate us."
            ]
        },
        contact: {
            patterns: ["contact", "phone", "email", "reach", "number"],
            responses: [
                "You can reach us at +254 799 250 399 or larkiptech@gmail.com. We're also on WhatsApp!",
                "Contact us at +254 799 250 399 or email larkiptech@gmail.com. The WhatsApp button is available too!",
                "Our phone number is +254 799 250 399 and email is larkiptech@gmail.com. Feel free to WhatsApp us as well."
            ]
        },
        thanks: {
            patterns: ["thanks", "thank you", "appreciate", "helpful"],
            responses: [
                "You're welcome! Is there anything else I can help with?",
                "My pleasure! Let me know if you need anything else.",
                "Happy to help! Don't hesitate to ask if you have more questions."
            ]
        },
        goodbye: {
            patterns: ["bye", "goodbye", "see you", "later", "farewell"],
            responses: [
                "Goodbye! We look forward to serving you at LightWeight Restaurant!",
                "See you soon! Hope to welcome you in person.",
                "Have a wonderful day! Come visit us soon."
            ]
        },
        default: {
            responses: [
                "I'm not sure I understand. Could you rephrase that?",
                "I'm still learning. Could you ask something else?",
                "I don't have an answer for that. Try asking about our menu, reservations, or contact info."
            ]
        }
    };
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });
    
    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });
    
    // Add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Process user input and generate response
    function processInput(input) {
        input = input.toLowerCase().trim();
        
        // Check for matches in training data
        for (const [category, data] of Object.entries(trainingData)) {
            if (category === 'default') continue;
            
            for (const pattern of data.patterns) {
                if (input.includes(pattern)) {
                    const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];
                    return randomResponse;
                }
            }
        }
        
        // No match found, use default response
        const randomDefault = trainingData.default.responses[Math.floor(Math.random() * trainingData.default.responses.length)];
        return randomDefault;
    }
    
    // Initial bot message
    addMessage("Hello! I'm the LightWeight Assistant. How can I help you today?");
    
    // Handle user input
    function handleUserInput() {
        const userInput = chatbotInput.value.trim();
        if (!userInput) return;
        
        addMessage(userInput, true);
        chatbotInput.value = '';
        
        // Show "typing" indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message bot-message typing';
        typingIndicator.textContent = '...';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Simulate thinking delay
        setTimeout(() => {
            chatbotMessages.removeChild(typingIndicator);
            const botResponse = processInput(userInput);
            addMessage(botResponse);
        }, 1000 + Math.random() * 1000);
    }
    
    // Event listeners for input
    sendBtn.addEventListener('click', handleUserInput);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Auto-open chatbot if user seems stuck
    let interactionCount = 0;
    const pageInteractions = ['mousemove', 'scroll', 'click', 'keydown'];
    
    pageInteractions.forEach(event => {
        window.addEventListener(event, () => {
            interactionCount++;
            
            // After 3 interactions, suggest help if chatbot isn't open
            if (interactionCount === 3 && !chatbotContainer.classList.contains('active')) {
                setTimeout(() => {
                    addMessage("Need help? I'm here to answer your questions about LightWeight Restaurant!");
                }, 5000);
            }
        }, { once: true });
    });
});