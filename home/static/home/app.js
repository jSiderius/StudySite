const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSubMenu(button){
    if(sidebar.classList.contains('close')){
        toggleSidebar()
    }

    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')
}

function toggleSidebar(){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')

    var name = document.getElementById("name")
    if(!sidebar.classList.contains('close')){
            name.style.display = 'block';
            return;
        }
    
    name.style.display = 'none';
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })
}
