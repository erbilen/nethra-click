const API_URL = 'http://localhost:3000/api/status';

const avatarEl = document.getElementById('user-avatar');
const usernameEl = document.getElementById('username');
const activityEl = document.getElementById('activity');
const statusIndicatorEl = document.getElementById('status-indicator');

const statusColors = {
    online: 'var(--status-online)',
    idle: 'var(--status-idle)',
    dnd: 'var(--status-dnd)',
    offline: 'var(--status-offline)'
};

async function fetchStatus() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (data.avatar) {
            avatarEl.src = data.avatar;
        }
        usernameEl.textContent = data.username || 'Unknown User';
        const status = data.status || 'offline';
        statusIndicatorEl.style.backgroundColor = statusColors[status] || statusColors['offline'];

        if (data.activity) {
            activityEl.textContent = data.activity;
        } else {
            if (status === 'dnd') activityEl.textContent = 'Do Not Disturb';
            else if (status === 'idle') activityEl.textContent = 'Idle';
            else if (status === 'online') activityEl.textContent = 'Online';
            else activityEl.textContent = 'Offline';
        }

    } catch (error) {
        console.error('Failed to fetch status:', error);
        statusIndicatorEl.style.backgroundColor = statusColors['offline'];
        activityEl.textContent = 'Currently Offline';
    }
}
fetchStatus();
setInterval(fetchStatus, 5000);
