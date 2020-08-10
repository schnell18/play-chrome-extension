var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem)
chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isFinite(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function(budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total)
                }
                newTotal += parseInt(clickData.selectionText)
                chrome.storage.sync.set({'total': newTotal}, function() {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon64.png',
                            title: 'Limit reached!',
                            message: 'Opos, looks like you reached your limit!'
                        }
                        chrome.notifications.create('limitNotif', notifOptions)
                    }
                })
            })
        }
    }
})

chrome.storage.onChanged.addListener(function(changes, storageName) {
    var badgeText = changes.total.newValue > 99 ? '99+' : changes.total.newValue.toString()
    chrome.browserAction.setBadgeText({"text": badgeText})
})