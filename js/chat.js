// js/chat.js

const chatData = {
    whatsapp: [
        { id: 1, name: 'أحمد محمد', time: '10:30 م', lastMessage: 'هل يمكنك تأكيد الطلب؟', unread: true },
        { id: 2, name: 'شركة الأمل', time: '09:15 ص', lastMessage: 'تم استلام الدفعة شكراً لك.', unread: false }
    ],
    facebook: [
        { id: 3, name: 'سارة خالد', time: 'أمس', lastMessage: 'متى تتوفر الألوان الأخرى؟', unread: true }
    ],
    instagram: [
        { id: 4, name: 'user_123', time: 'السبت', lastMessage: 'شكراً على الخدمة الرائعة', unread: false }
    ],
    telegram: [
        { id: 5, name: 'دعم فني', time: '11:00 ص', lastMessage: 'تم حل المشكلة رقم 402', unread: false }
    ]
};

const messages = [
    { type: 'received', text: 'مرحباً، أريد الاستفسار عن الخدمة.' },
    { type: 'sent', text: 'أهلاً بك، تفضل كيف يمكنني مساعدتك؟' },
    { type: 'received', text: 'هل يمكنك تأكيد الطلب الأخير؟' }
];

let currentPlatform = 'all';

function switchPlatform(platform) {
    currentPlatform = platform;
    
    // Update Title
    const titles = {
        whatsapp: 'واتساب',
        facebook: 'فيسبوك',
        instagram: 'انستاجرام',
        telegram: 'تليجرام',
        all: 'جميع الرسائل'
    };
    document.getElementById('current-platform-title').textContent = titles[platform] || 'الرسائل';
    
    // Update Sidebar Active state
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    renderChatList(platform);
}

function renderChatList(platform) {
    const container = document.getElementById('chat-list-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    let items = [];
    if (platform === 'all' || !chatData[platform]) {
        items = [...chatData.whatsapp, ...chatData.facebook, ...chatData.instagram, ...chatData.telegram];
    } else {
        items = chatData[platform];
    }
    
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `chat-item ${index === 0 ? 'active' : ''}`;
        div.innerHTML = `
            <div class="avatar">${item.name.charAt(0)}</div>
            <div class="chat-item-content">
                <div class="chat-item-header">
                    <span class="chat-item-name">${item.name}</span>
                    <span class="chat-item-time">${item.time}</span>
                </div>
                <div class="chat-item-message" style="${item.unread ? 'font-weight:bold; color:var(--foreground)' : ''}">
                    ${item.lastMessage}
                </div>
            </div>
        `;
        div.onclick = () => loadChat(item);
        container.appendChild(div);
    });
}

function loadChat(item) {
    // Update active state
    document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Update Header
    document.getElementById('active-chat-name').textContent = item.name;
    document.getElementById('active-chat-avatar').textContent = item.name.charAt(0);
    
    renderMessages();
}

function renderMessages() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;
    
    container.innerHTML = '';
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message-bubble message-${msg.type}`;
        div.textContent = msg.text;
        container.appendChild(div);
    });
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    if (!text) return;
    
    messages.push({ type: 'sent', text: text });
    input.value = '';
    renderMessages();
}

function generateAiReply() {
    const container = document.getElementById('chat-messages-container');
    
    // Show typing indicator
    const indicator = document.createElement('div');
    indicator.className = `message-bubble message-received`;
    indicator.innerHTML = `<i data-lucide="loader" class="spin"></i> جاري كتابة الرد التلقائي...`;
    container.appendChild(indicator);
    lucide.createIcons();
    container.scrollTop = container.scrollHeight;
    
    setTimeout(() => {
        indicator.remove();
        messages.push({ type: 'received', text: 'بناءً على طلبك السابق، لقد تم تأكيد الطلب بنجاح وسيصلك خلال يومين عمل. شكراً لاختيارك خدماتنا. (رد تلقائي بواسطة الذكاء الاصطناعي)' });
        renderMessages();
    }, 1500);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('chat-list-container')) {
        renderChatList('all');
        renderMessages();
    }
});
