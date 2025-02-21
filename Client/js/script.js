let ws = null;
let currentUserId = null;

function connect() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        alert('Please enter a User ID');
        return;
    }

    currentUserId = userId;
    ws = new WebSocket('ws://localhost:4000');

    ws.onopen = () => {
        document.getElementById('status').textContent = 'Connected';
        ws.send(JSON.stringify({ type: 'subscribe', userId: userId }));
    };

    ws.onclose = () => {
        document.getElementById('status').textContent = 'Disconnected';
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        logRealTimeEvent(`Received: ${JSON.stringify(data)}`);
    };

    ws.onerror = (error) => {
        logRealTimeEvent(`Error: ${error.message}`);
    };
}

function disconnect() {
    if (ws) {
        ws.close();
        ws = null;
        document.getElementById('status').textContent = 'Disconnected';
    }
}

function sendEvent() {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        alert('Please connect first');
        return;
    }

    const eventType = document.getElementById('eventType').value;
    ws.send(JSON.stringify({
        type: 'event',
        event: {
            userId: currentUserId,
            eventType: eventType
        }
    }));
}

async function fetchRecentEvents() {
    if (!currentUserId) {
        alert('Please connect first');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/events/recent/${currentUserId}`);
        const events = await response.json();

        const eventLogElement = document.getElementById('fetchedEventLog');
        eventLogElement.innerHTML = ''; 

        events.forEach(event => {
            const eventText = `Recent event: ${JSON.stringify(event)}`;
            logFetchedEvent(eventText);
            eventLogElement.innerHTML += `<p>${eventText}</p>`;
        });
    } catch (error) {
        logFetchedEvent(`Error fetching events: ${error.message}`);
    }
}

function logRealTimeEvent(message) {
    const eventLog = document.getElementById('realTimeEventLog');
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-item';
    eventDiv.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
    eventLog.insertBefore(eventDiv, eventLog.firstChild);
}

function logFetchedEvent(message) {
    const eventLog = document.getElementById('fetchedEventLog');
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-item';
    eventDiv.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
    eventLog.insertBefore(eventDiv, eventLog.firstChild);
}
