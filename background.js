const blacklist = [
    'facebook.com',
];

function notifyBlockedUrl(url) {
    browser.notifications.create({
        type: "basic",
        title: "Blacklisted URL",
        message: `${url} is blocked`
    });
}

function closeTabIfBlacklisted(url, tabId) {
    for (const blacklistedUrl of blacklist) {
        if (url.match(blacklistedUrl)) {
            browser.tabs.remove(tabId);
            notifyBlockedUrl(url);
        }
    }
}

function handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
        console.log("Tab: " + tabId +
                    " URL changed to " + changeInfo.url);
        closeTabIfBlacklisted(changeInfo.url, tabId);
    }
}

browser.tabs.onUpdated.addListener(handleUpdated);
