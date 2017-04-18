function(spModal) {
    var c = this;
    c.uiAction = function(action, table) {
        c.data.action = action;
        c.data.table = table;
        //console.log(c.data.table);
        c.server.update().then(function() {
            c.data.action = null;
        });
    };
    c.onConfirm = function() {
        c.confirmed = "asking";
        var warn = '<i class="fa fa-warning" aria-hidden="true"></i>';
        spModal.open({
            title: warn + '  Close Ticket',
            message: 'Are you <b>sure</b> you want to close this ticket?'
        }).then(function(confirmed) {
            c.confirmed = confirmed;
            c.uiAction('resolve', c.data.table);
        })
    }
}
