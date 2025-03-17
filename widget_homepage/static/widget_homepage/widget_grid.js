var min_widget_id = 0
// let widgets = document.getElementsByClassName("widget");
let widget_page = document.getElementById("widget-page");
let widget_menu = document.getElementById("widget-menu");

document.querySelectorAll('.widget-option').forEach(option => {
    option.setAttribute("draggable", "true");
    option.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData("text/plain", event.target.id + '-option');
    });
});

widget_page.addEventListener('dragover', function(event) {
    event.preventDefault();
});

widget_menu.addEventListener("drop", function(event){
    event.preventDefault();

    let widget_ID = event.dataTransfer.getData("text/plain");
    widget = document.getElementById(widget_ID)
    if (!widget){ return }
    widget.remove()

});

widget_page.addEventListener('drop', function(event){
    event.preventDefault()

    let widget_ID = event.dataTransfer.getData("text/plain");

    if (widget_ID.endsWith('-option')){
        
        const new_widget_ID = "widget" + min_widget_id;
        min_widget_id += 1;

        // TODO: Repeating this
        if (widget_ID === "todo-list-option"){
            var widget = createTodoWidget(new_widget_ID);
            widget.addEventListener("dragstart", function(event){
                event.dataTransfer.setData("text/plain", new_widget_ID);
            });
            widget_page.appendChild(widget);
        }else if (widget_ID === "pomodoro-timer-option"){
            var widget = createPomodoroTimer(new_widget_ID)
            widget.addEventListener("dragstart", function(event){
                event.dataTransfer.setData("text/plain", new_widget_ID);
            });
            widget_page.appendChild(widget);
        }

        return;
    }


    widget = document.getElementById(widget_ID);
    if (!widget){ return; }
    // var widget_rect = widget.getBoundingClientRect();

    var shortest_distance = Infinity
    var closest_element = null
    widget_page.appendChild(widget)

    for (const child of Array.from(widget_page.children)){
        var rect = child.getBoundingClientRect(); 

        var distance_to_selected = Math.sqrt( Math.pow(event.clientX - (rect.x + rect.width / 2.0), 2) + Math.pow(event.clientY - (rect.y + rect.height / 2.0), 2) )
        if (distance_to_selected < shortest_distance){
            shortest_distance = distance_to_selected
            closest_element = child
        }
    }

    widget_page.insertBefore(widget, closest_element);
});

widget_menu.addEventListener('dragover', function(event) {
    event.preventDefault();
});
