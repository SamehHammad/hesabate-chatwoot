// js/settings.js

function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Remove active class from tabs
    document.querySelectorAll('.tab').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked tab
    event.currentTarget.classList.add('active');
}

function updateStatusUI(idPrefix, isConnected) {
    const statusBadge = document.getElementById(`status-${idPrefix}`);
    if (statusBadge) {
        if (isConnected) {
            statusBadge.className = 'status-badge status-connected';
            statusBadge.textContent = 'متصل';
        } else {
            statusBadge.className = 'status-badge status-disconnected';
            statusBadge.textContent = 'غير متصل';
        }
    }
}

function saveCredentials(provider) {
    const input = document.getElementById(`apiKey-${provider}`);
    if (!input || !input.value.trim()) {
        alert('الرجاء إدخال المفتاح أولاً');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem(`ai_cred_${provider}`, input.value.trim());
    
    // Update UI
    updateStatusUI(provider, true);
    
    // Show success message (using native alert for simplicity in static demo)
    alert(`تم حفظ إعدادات ${provider} بنجاح!`);
}

function saveSocialCreds(platform) {
    const idInput = document.getElementById(`creds-${platform === 'whatsapp' ? 'wa' : platform === 'facebook' ? 'fb' : platform === 'instagram' ? 'ig' : 'tg'}-id`);
    const tokenInput = document.getElementById(`creds-${platform === 'whatsapp' ? 'wa' : platform === 'facebook' ? 'fb' : platform === 'instagram' ? 'ig' : 'tg'}-token`);
    
    // Some platforms only need a token (like Telegram)
    if (tokenInput && !tokenInput.value.trim()) {
        alert('الرجاء إدخال البيانات المطلوبة أولاً');
        return;
    }
    
    if (idInput) localStorage.setItem(`social_id_${platform}`, idInput.value.trim());
    if (tokenInput) localStorage.setItem(`social_token_${platform}`, tokenInput.value.trim());
    
    updateStatusUI(platform, true);
    alert(`تم ربط قناة ${platform} بنجاح!`);
}

// Load saved credentials on startup
document.addEventListener('DOMContentLoaded', () => {
    // AI Providers
    ['openai', 'gemini', 'anthropic', 'llama'].forEach(provider => {
        const saved = localStorage.getItem(`ai_cred_${provider}`);
        if (saved) {
            const input = document.getElementById(`apiKey-${provider}`);
            if (input) input.value = saved;
            updateStatusUI(provider, true);
        }
    });
    
    // Social Media Platforms
    ['whatsapp', 'facebook', 'instagram', 'telegram'].forEach(platform => {
        const tokenPrefix = platform === 'whatsapp' ? 'wa' : platform === 'facebook' ? 'fb' : platform === 'instagram' ? 'ig' : 'tg';
        const savedToken = localStorage.getItem(`social_token_${platform}`);
        const savedId = localStorage.getItem(`social_id_${platform}`);
        
        if (savedToken || savedId) {
            const tokenInput = document.getElementById(`creds-${tokenPrefix}-token`);
            const idInput = document.getElementById(`creds-${tokenPrefix}-id`);
            
            if (tokenInput && savedToken) tokenInput.value = savedToken;
            if (idInput && savedId) idInput.value = savedId;
            
            updateStatusUI(platform, true);
        }
    });
});
