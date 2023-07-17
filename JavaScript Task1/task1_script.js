let plusBtn = document.getElementById("btnPlus")
let content = document.getElementById("content")
let message = document.getElementById('msg')

//counter that count the no. of times add button clicked
var counter = 0

//add function
function addContent() {
    //counter is less than 10 then add the input text with subtract buttton
    if (counter < 10) {
        content.innerHTML +=
            `<div id=${counter} class="container d-flex mt-2 justify-content-center"> 
                <input class="form-control w-25" type="text" placeholder="Enter your input">
                <button class="btn btn-danger ms-3" id="btnRemove" onclick="removeContent(${counter})"><img src="images/minus.svg"></button>
            </div>`

        //each time button is clicked increase the counter by 1
        counter++
    }
    //this block execute if input was added 10 times
    else {
        plusBtn.style.display='none'
        message.innerHTML += 'You can add only 10 textboxes'
    }
}

//removefunction
function removeContent(value) {

    document.getElementById(value).remove()
    //each time the subtract button ic clicked counter in descrease by 1
    counter--
    
    if (counter < 10) {
        plusBtn.style.display='inline'
        message.innerHTML = ""
    }
}
