chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "assets/icon128.png",
        title: "LinkLater Reminder",
        message: alarm.name
    });
});
