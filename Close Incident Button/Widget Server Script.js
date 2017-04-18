(function() {

    // Get table & sys_id
    data.table = $sp.getParameter("table");
    data.sys_id = $sp.getParameter("sys_id");

    // Valid GlideRecord
    gr = new GlideRecord(data.table);
    if (!gr.isValid())
        return;
    data.valid = false;

    // Valid sys_id
    if (!gr.get(data.sys_id))
        return;

    // Load task state for all other reference types -- probably delete this later.
    var state = gr.state;
    console.log(gr.caller_id.sys_id);

    // Determine if ticket is an incident, request, etc. and handle accordingly.
    switch (String(data.table)) {
        case "incident": // Handle incidents
            if (gr.incident_state != 6 && gr.incident_state != 7 && gr.caller_id.sys_id == gs.getUserID()) {
                console.log(gr.incident_state);
                data.valid = true;
            }
            break;
        default: // Hide button as base case
            data.valid = false;
            break;
    }

    // If Incident table

    if (data.table == 'incident') {
        if (action == 'resolve') {

            // Resolve Incident

            gr.setValue('incident_state', 7);
            gr.setValue('close_code', 'Resolved by Caller');
            gr.setValue('close_notes', 'Resolved by caller: ' + gs.getUserDisplayName());
            gr.update();
            data.valid = false;
        }

    }

})();
