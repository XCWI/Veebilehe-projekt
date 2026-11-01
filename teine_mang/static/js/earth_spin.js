setInterval(get_data, 1000);
async function get_data() {
    const some_data = await fetch('/game_data',
        {
            method: 'POST'
        }
    );
    const data = await some_data.json();
    for (const item of data){document.getElementById(item.info).innerHTML = item.value;}
}
async function start_game() {
    const send_data = fetch("/start_game");
    
}
async function gather_food() {
    const send_data = fetch("/gather_food");
}
