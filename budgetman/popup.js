$(function() {
    chrome.storage.sync.get('total', function(budget) {
        $('#total').text(budget.total)
    })
    chrome.storage.sync.get('limit', function(budget) {
        $('#limit').text(budget.limit)
    })
    $('#spendAmount').click(function() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            var newTotal = 0
            if (budget.total) {
                newTotal += parseInt(budget.total)
            }

            var amount = $('#amount').val()
            if (amount) {
                newTotal += parseInt(amount)
            }
            chrome.storage.sync.set({'total': newTotal}, function() {
                if (amount && newTotal >= budget.limit) {
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon64.png',
                        title: 'Limit reached!',
                        message: 'Opos, looks like you reached your limit!'
                    }
                    chrome.notifications.create('limitNotif', notifOptions)
                }
            })
            $('#total').text(newTotal)
            $('#amount').val('')
        })
    })
})