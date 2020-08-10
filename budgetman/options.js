$(function() {
    $('#saveLimit').click(function() {

        var limit = $('#limit').val()
        if (limit) {
            limit = parseInt(limit)
        }
        else {
            limit = 0
        }
        chrome.storage.sync.set({'limit': limit}, function() {
            close()
        })
    })

    $('#resetTotal').click(function() {
        chrome.storage.sync.set({'total': 0}, function() {
                var notifOptions = {
                    type: 'basic',
                    iconUrl: 'icon64.png',
                    title: 'Total reseted!',
                    message: 'Total is reset to zero!'
                }
                chrome.notifications.create('limitNotif', notifOptions)
            })
    })
})