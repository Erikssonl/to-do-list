let main = document.getElementById('content');
let choreBtn = document.getElementById('add-chore-btn');
let chore = document.getElementById('add-chore');



choreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let errorMessage = validateInput(chore)

    if (errorMessage == "") {
        let choreToDo = document.createElement("INPUT");
        choreToDo.value = chore.value;
        choreToDo.disabled = true;
        chore.value = "";
    
        let changeBtn = document.createElement('button')
        changeBtn.innerText = "Ändra";
    
        let doneBtn = document.createElement('button')
        doneBtn.innerText = "Färdig";
    
        let deletBtn = document.createElement('button')
        deletBtn.innerText = "Radera";
    
        let li = document.createElement("li");
        li.appendChild(choreToDo);
        li.appendChild(changeBtn);
        li.appendChild(doneBtn);
        li.appendChild(deletBtn);
    
        let buttons = Object.create(buttonTasks);
        buttons.init(changeBtn, doneBtn, deletBtn)
        buttons.changeFunction(choreToDo);
        buttons.doneFunction(li);
        buttons.deletFunction();
    
        let choreList = document.getElementById('chore-list');
        choreList.appendChild(li);
        
    } else {

        message.innerHTML = displayErrorMessage(errorMessage)
    }
    
})

function validateInput (chore){
    let message = document.getElementById('message');
    message.innerHTML = "";
    
    return fieldIsRequired(chore);

}

function displayErrorMessage(errorMessage) {
    if (errorMessage !== "") {
        return getErrorMessage(errorMessage);
    }
    return"";
}

function getErrorMessage(errorMessage) {
    return `
    <p class="text-danger">
      ${errorMessage}
    </p>
  `;
}

function fieldIsRequired(input) {
    if (isFieldEmpty(input)) {
      return "Tomma sysslor får ej sparas";
    }
    
    return '';
  }

function isFieldEmpty(input) {
    return input.value.trim() == ""
}
  

let buttonTasks = {

    init: function(change, done, delet){
        this.change = change;
        this.done = done;
        this.delet = delet;
    },


    changeFunction: function(choreToDo){
        this.change.addEventListener('click', function(){
            if (choreToDo.disabled == true) {
                choreToDo.disabled = false;
            } else {
                let errorMessage = validateInput(choreToDo)
                if (errorMessage == "") {
                    choreToDo.disabled = true;
                    
                } else {
                    message.innerHTML = displayErrorMessage(errorMessage)
                }

            }
        });
    },

    doneFunction: function(li){
        this.done.addEventListener('click', function(e){
            e.preventDefault();

            let doneList = document.getElementById('done-list');
            doneList.append(li);
            e.target.remove();
        });
    },

    deletFunction: function(){
        this.delet.addEventListener('click', function(e){
            e.preventDefault();
            e.target.parentNode.remove();
        });
    }
}
 
let resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', function(e){
    let choreList = document.getElementById('chore-list');
    let doneList = document.getElementById('done-list');

    choreList.innerHTML = '';
    doneList.innerHTML = '';

})