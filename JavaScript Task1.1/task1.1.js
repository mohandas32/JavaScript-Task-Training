let btnPlus = document.getElementById('btnPlus')
let content = document.getElementById('content')
let btnRefresh = document.getElementById('refresh')

btnRefresh.addEventListener("click",()=>{
    
    //when the refresh button is clicked the div content is empty
    content.innerHTML=""
    arrayCount=[]

    btnPlus.style.visibility='visible'
    document.getElementById('in').value=""
    
})

//creating array that store the button count
let arrayCount=[]

function addContent(){

    
    //if length of the array is less than 10
    if(arrayCount.length < 10){

        //creating the element that has to be appended
        let div= document.createElement('div')
        div.className="container d-flex gap-1 mt-2"

        let minusBtn=document.createElement('button')
        minusBtn.className="btn btn-outline-danger text-dark"
        minusBtn.setAttribute('onclick','removeContent(this)')
        minusBtn.textContent="-"

        let input = document.createElement('input')
        input.className="form-control"
        input.setAttribute('placeholder','Enter your input')

        div.appendChild(input)
        div.appendChild(minusBtn)

        content.appendChild(div)

        //push 1 everytime the button is clicked
        arrayCount.push('1')
    }
    //else hide the add button and alert the user
    else{
        btnPlus.style.visibility='hidden'
        alert("You can add only 10 textboxes")
    }
}
function removeContent(mbtn){
    //each time remove one element from the array
    arrayCount.pop()
    mbtn.parentNode.remove()

    if(arrayCount.length < 10){
        btnPlus.style.visibility='visible'
    }
}