//state variable
var game_playing = true;

//To generate a table
function generate_table() {
    var table = document.createElement('table');
    table.className = 'table table-bordered';
    table.id = 'generated_table'

    counter = 0;
    for (let i = 0; i < 3; i++){
        var row = table.insertRow(i);
        for (let j = 0; j < 3; j++){
            var td = row.insertCell(j);
            td.id = counter.toString();
            //td.textContent = counter;
            counter += 1;
        }
    }
    document.body.appendChild(table);
}

generate_table();

//To get the location of each table data in the DOM for further manipulation
var tag_list = document.getElementsByTagName('td');
tag_list = Array.from(tag_list);
console.log(tag_list);

//To keep track of whose turn it is
//player turn means human player's turn
var player_turn = true;

//Human player makes his input when it is human player's turn
for (let i = 0; i <tag_list.length ; i++){
    function change_to_X(){
        if (win_condition() || draw_condition()){
            return;
        }
        if (tag_list[i].textContent == ''){
            tag_list[i].textContent = 'X';
            tag_list[i].style.backgroundColor = '#ceebfd';
            player_turn = false;
            //console.log(player_turn);
        }
    }
    tag_list[i].addEventListener('click', change_to_X);
}

//Computer inputs when it his turn
    //To generate a random id to target a random table data cell
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  } 

function computer_input(){
    console.log('computer_input() running');
    if (win_condition() || draw_condition()){
        return;
    }

    if (player_turn == false){
        random_id = getRndInteger(0, 9);
        while (tag_list[random_id].textContent == 'X' || tag_list[random_id].textContent== 'O'){
            //to prevent infinite loop
            if (draw_condition()) {
                return
            } else {
            random_id = getRndInteger(0, 9);
            }
        }
        console.log(random_id);
        tag_list[random_id].textContent = 'O';
        tag_list[random_id].style.backgroundColor = '#ccffcc';
        player_turn = true;
    }
}

//Condition for winning
function win_condition(){
    //row wins
    for (let i = 0; i < 9; i += 3){
        check_string = tag_list[i].textContent + tag_list[i+1].textContent + tag_list[i+2].textContent;
        if (check_string == 'XXX' || check_string == 'OOO'){
            return true;
        }
    }

    //column wins 
    for (let i = 0; i < 3; i++){
        check_string = tag_list[i].textContent + tag_list[i+3].textContent + tag_list[i+6].textContent;
        if (check_string == "XXX" || check_string ==  "OOO"){
            return true;
        }
    }

    //diagonal wins
    diagonal_1 = tag_list[0].textContent + tag_list[4].textContent + tag_list[8].textContent;
    diagonal_2 = tag_list[2].textContent + tag_list[4].textContent + tag_list[6].textContent;
    if (diagonal_1 == 'XXX' || diagonal_1 ==  'OOO'){
        return true;
    }
    if (diagonal_2 == 'XXX' || diagonal_2 ==  'OOO'){
        return true;
    }   

    return false;
}

//Condition for a draw
function draw_condition(){
    var counter = 0;
    for (let i =0; i < tag_list.length; i++){
        if (tag_list[i].textContent == 'X' || tag_list[i].textContent == 'O'){
            counter += 1;
        }
    }
    console.log(counter);
    if (counter == tag_list.length) {
        return true;
    } else {
        return false;
    }
}

//Does not work because the eventlistener is executed only after all the lines in this file have been executed
// while (! win_condition()){
//     computer_input();
//     console.log(player_turn);
// }

//Function to check for win condition or draw condition
function end_of_player_turn(){
    function determine_result(){
        if (win_condition()){
            if (player_turn){
                var winner = 'Computer';
            } else {
                winner = 'You'
            }
            if(confirm(winner + ' won \nPlay again?')){
                window.location.reload();  
            }
        } else if (draw_condition()) {
            if(confirm('Game is a draw \nPlay again?')){
                window.location.reload();  
            }
        }
    }
    determine_result();
    computer_input();
    determine_result();
}

    //to delay the computer input 
function delayed_end_of_player_turn(){
    setTimeout(end_of_player_turn, 500);
}


for (let i = 0; i <tag_list.length ; i++){
    tag_list[i].addEventListener('click', delayed_end_of_player_turn);
}

