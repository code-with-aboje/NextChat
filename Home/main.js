const navItems = document.querySelectorAll('.nav-item');
const contentFrame = document.getElementById('contentFrame');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// GETTING DOM ELEMENTS
const newChatBtn = document.getElementById('newChatBtn');

newChatBtn.addEventListener("click", ()=>{
    // Add logic to create a new chat
    contentFrame.src = pages["newChat"];
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
});

// Page URLs - Replace these with your actual page paths
const pages = {
    chats: '../Chat/index.html',
    updates: './updates.html',
    calls: './calls.html',
    newChat: '../NewChat/index.html',
    chatRoom: '../ChatRoom/chat-room.html' // ← Add this
};

// Navigation click handler
navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        navItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get page name
        const pageName = this.getAttribute('data-page');
        
        // Load page in iframe
        if (pages[pageName]) {
            contentFrame.src = pages[pageName];
            console.log(`Loading ${pageName} page...`);
        }
    });
});

// Load default page (Chats) on startup
window.addEventListener('DOMContentLoaded', () => {
    const defaultPage = 'chats';
    if (pages[defaultPage]) {
        contentFrame.src = pages[defaultPage];
    }
});

// AI Input focus effect
const aiInput = document.querySelector('.ai-input');
const aiInputWrapper = document.querySelector('.ai-input-wrapper');

if (aiInput && aiInputWrapper) {
    aiInput.addEventListener('focus', () => {
        aiInputWrapper.style.transform = 'scale(1.01)';
    });
    
    aiInput.addEventListener('blur', () => {
        aiInputWrapper.style.transform = 'scale(1)';
    });
}

// Listen for messages from chat list iframe to open chat room
window.addEventListener('message', (event) => {
    if (event.data.type === 'openChat') {
        console.log('Opening chat:', event.data);
        
        // Build the chat room URL with parameters
        const chatUrl = `../ChatRoom/chat-room.html?chatId=${event.data.chatRoomId}&contactId=${event.data.contactId}`;
        
        // Load chat room in the iframe
        contentFrame.src = chatUrl;
    }
});
