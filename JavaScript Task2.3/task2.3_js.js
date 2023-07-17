let table = document.getElementById('table')
let reportTable = document.getElementById('reportTable')
let percentageTable=document.getElementById("percentageTable")



//arrays to store the name,subject and marks array
var nameArray = []
var subjectArray = []
var marksArray = []

let srCounter = 6

function validateData(){
    
        let nameInput = document.querySelectorAll(".stu_name")
        let subjectInput = document.querySelectorAll(".subject")
        let marksInput = document.querySelectorAll(".marks")
        let formValid=true //taking as a flag 

        //Regular Expression for validation
        let onlyAlpha=/^[A-Za-z\s]+$/ //name and subject must start with and end with alphabets
        let onlyDigit=/^[0-9]+$/ //only digits allowed

        for(val=0;val<table.rows.length-1;val++){

            //checking if any field is empty or not
            if(nameInput[val].value ==""){
                nameInput[val].nextElementSibling.style.display='block'
                nameInput[val].nextElementSibling.innerHTML="Please Enter Name"
                formValid=false
                break
            }
            else{
                nameInput[val].nextElementSibling.style.display='none'
            }
            
            if(subjectInput[val].value==""){
                subjectInput[val].nextElementSibling.style.display='block'
                subjectInput[val].nextElementSibling.innerHTML="Please Enter Subject"
                formValid=false
                break
            }
            else{
                subjectInput[val].nextElementSibling.style.display='none'
            }
            
            if(marksInput[val].value==""){
                marksInput[val].nextElementSibling.style.display='block'
                marksInput[val].nextElementSibling.innerHTML="Please Enter Marks"
                formValid=false
                break
            }
            else{
                marksInput[val].nextElementSibling.style.display='none'

            }
            //checking if name and subject field contain only alphabets or not
            if( !nameInput[val].value.match(onlyAlpha)){
                nameInput[val].nextElementSibling.style.display='block'
                nameInput[val].nextElementSibling.innerHTML="Only Alphabets Allowed"
                formValid=false
                break
            }
            else{
                nameInput[val].nextElementSibling.style.display='none'

            }

            if(!subjectInput[val].value.match(onlyAlpha) ){
                subjectInput[val].nextElementSibling.style.display='block'
                subjectInput[val].nextElementSibling.innerHTML="Only Alphabets Allowed"
                formValid=false
                break
            }
            else{
                subjectInput[val].nextElementSibling.style.display='none'
            }
            //checking the marks field contain number or not
            if(!marksInput[val].value.match(onlyDigit)){
                marksInput[val].nextElementSibling.style.display='block'
                marksInput[val].nextElementSibling.innerHTML="Only Digits Allowed"
                formValid=false
                break
            }
            
            //checking if marks are not more than 100 or less than 0
            if(Number.parseInt(marksInput[val].value) < 0 || Number.parseInt(marksInput[val].value) >100){
                marksInput[val].nextElementSibling.style.display='block'
                marksInput[val].nextElementSibling.innerHTML="Marks Should be less than 100 or more than 0"
                formValid=false
                break
            }
            else{
                marksInput[val].nextElementSibling.style.display='none'
            }
    }
    //if formValid flag is true then call this method
    if(formValid){
        getAllData()
    }

}

function onClickAccept(thatBtn){
    thatBtn.classList.add("active") //add active class to button
    thatBtn.nextElementSibling.classList.remove('active') //remove the active calss from reject btn

    let allAcceptBtn=document.querySelectorAll('.pass') //select all the accept btn
    for(let i=0; i<allAcceptBtn.length; i++){
        btnClasses=allAcceptBtn[i].classList.contains('active')  //getting all the accept btn that contain active class
        if(btnClasses == true){  //if accept btn contain active class then add acceptRow to that row
            allAcceptBtn[i].parentNode.parentNode.parentNode.classList.add('acceptRow') 
        }   
    }
}

function onClickReject(thatBtn){

    thatBtn.classList.add("active")
    thatBtn.previousElementSibling.classList.remove('active')

    let allRejectBtn=document.querySelectorAll('.fail')

    for(let i=0; i<allRejectBtn.length; i++){
         btnClasses=allRejectBtn[i].classList.contains('active')
        if(btnClasses == true){
            allRejectBtn[i].parentNode.parentNode.parentNode.classList.remove('acceptRow')
        }
    }
}

///function for add the row
function addRowContent() {
    let newRow = table.insertRow(srCounter)

    let newCell1 = newRow.insertCell(0)
    let newCell2 = newRow.insertCell(1)
    let newCell3 = newRow.insertCell(2)
    let newCell4 = newRow.insertCell(3)
    let newCell5 = newRow.insertCell(4)
    let newCell6 = newRow.insertCell(5)
    
    newCell1.className = "count"
    newCell2.innerHTML = `<input type="text"  class="form-control my-1 stu_name"   placeholder="Enter Name"><span style="color:red; display: none;"></span>`
    newCell3.innerHTML = `<input type="text"  class="form-control my-1 subject" placeholder="Enter Subject"><span style="color:red; display: none;"></span>`
    newCell4.innerHTML = `<input type="text"  class="form-control my-1 marks"  placeholder="Enter Marks"><span style="color:red; display: none;"></span>`
    newCell5.innerHTML = ` <div class="my-1">
    <button type="button" class="pass btn btn-outline-success" onclick="onClickAccept(this)">ACCEPT</button>
    <button type="button" class="fail btn btn-outline-danger" onclick="onClickReject(this)">REJECT</button>
    </div>`
    newCell6.innerHTML = `<button type="button" class="fail btn btn-outline-danger" onclick="removeRowContent(this)">Remove </button>`
    srCounter++
}

//function for remove the row 
function removeRowContent(row) {
    let confirmDel = confirm(`Are you sure to delete the row ?`)
    if(confirmDel == true){
        row.parentNode.parentNode.remove()
        srCounter--
        
        document.getElementById('alertMsg').innerHTML="ROW DELETED SUCCESFULLY"
        document.getElementById('alertMsg').style.display='block'

        setTimeout(()=>{
            document.getElementById('alertMsg').style.display='none'
        },3000)
    }
}

//function to get the data in table
function getAllData() {
    reportTable.innerHTML = `<tr class="reportThead">
                             <th>SR NO.</th>
                            <th>NAME</th>
                            <th>SUBJECT</th>
                            <th>MARKS</th>
                          </tr>`

                          
    let name = document.querySelectorAll(".stu_name")
    let subject = document.querySelectorAll(".subject")
    let marks = document.querySelectorAll(".marks")
    
    //getting all the values of the row
    for (i = 0; i < name.length; i++) {

        let parentNode= name[i].parentNode.parentNode
        if(parentNode.classList.contains('acceptRow')==true){
       
            nameArray.push(((name[i].value).trim()).toUpperCase())
            subjectArray.push(((subject[i].value).trim()).toUpperCase())
            marksArray.push(marks[i].value)
        }
    }
    if(nameArray.length==0){
        let row = reportTable.insertRow(1)
        row.insertCell(0).innerHTML="-----"
        row.insertCell(1).innerHTML="-----"
        row.insertCell(2).innerHTML="-----"
        row.insertCell(2).innerHTML="-----"
    }

    for (i = 1; i < nameArray.length+1; i++) {
        let row = reportTable.insertRow(i)

        row.insertCell(0).className = "count"
        row.insertCell(1).innerHTML = nameArray[i - 1]
        row.insertCell(2).innerHTML = subjectArray[i - 1]
        let newCell4 = row.insertCell(3)

        //color the row in which the marks of the student is less than 33
        if (Number.parseInt(marksArray[i - 1]) < 33) {
            newCell4.innerHTML = marksArray[i - 1]
            newCell4.parentNode.style.background = "#F08080"
            newCell4.parentNode.style.fontWeight = "bold"
            newCell4.parentNode.style.textDecoration = "underline"
        }
        else {
            newCell4.innerHTML = marksArray[i - 1]
        }
    }
    document.getElementById("reportArea").style.visibility = 'visible'
    
    //calling function to print the percentage table
    getPercentage();
    nameArray.length=0
    subjectArray.length=0
    marksArray.length=0
}

function searchData() {
    let searchText = document.getElementById('searchText').value.toLowerCase()
    let resultTable = document.getElementById('reportTable')

    let tableRow = resultTable.getElementsByTagName('tr')
    //loop through each row and get the values of names and subject
    for (let i = 1; i < tableRow.length; i++) {

        let tdName = tableRow[i].getElementsByTagName('td')[1];
        let tdSubject = tableRow[i].getElementsByTagName('td')[2]
        
        if (tdName || tdSubject) {
            let subjectValue = tdSubject.innerHTML || tdSubject.textContent
            let nameValue = tdName.innerHTML || tdName.textContent
            
            //if the searchText name or subject startswith the entered text then display that row
            if (nameValue.toLowerCase().startsWith(searchText) || subjectValue.toLowerCase().startsWith(searchText) ) {
                tableRow[i].style.display = ""
            }
            else {
                tableRow[i].style.display ='none'
            }
        }
    }
}
//function for performing sorting,specify the column number 1 - for name and 2 - for subject
function sortContent(col) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("reportTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
//function for sorting the marks
function sortMarks() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("reportTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];

            if (Number.parseInt(x.innerHTML) > Number.parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
//function that print the new table withe percentage of student
function getPercentage(){
    percentageTable.innerHTML=`<tr class="reportThead">
                                <th>SR NO.</th>
                                <th>NAME</th>
                                <th>PERCENTAGE</th>
                               </tr>`
    let sum=0
    let percentage=[]
    let newMarksArray=[]

    //finding the duplicates values from the nameArray
    let duplicateName = nameArray.filter((value, index) =>{
        return nameArray.lastIndexOf(value)== index && nameArray.indexOf(value)!= index;
    })
    //stores the values that are not duplicate
    let nonduplicate =nameArray.filter( (v,i) =>{
        return nameArray.indexOf(v) ==i && nameArray.lastIndexOf(v)==i
    })
    
    //get all the student name and marks that are not duplicate
    for(i in nonduplicate){
        for(j in nameArray){
            if(nonduplicate[i]===nameArray[j]){
                newMarksArray.push(marksArray[j]) //store the marks in newMarksArray
            }
        }
    }
 
    countTimes=0
    for(let i in duplicateName){    //iterate over each item of the duplicateName
     //iterate over each item of the nameArray
        for(let j in nameArray){    
            if(duplicateName[i] === nameArray[j]){    //checking if duplicateName is in the nameArray then return the index
                countTimes++
                sum += Number.parseInt(marksArray[j])
            }
        }
        percentage.push(sum/countTimes) //finding percentage of student whoes name occur more than 1 time
        sum=0
        countTimes=0
    }

    if(duplicateName.length==0 && nonduplicate.length==0){
        let row=percentageTable.insertRow(1)
        row.insertCell(0).innerHTML="-----"
        row.insertCell(1).innerHTML="-----"
        row.insertCell(2).innerHTML="-----"
    }

    //printing the data i table of student whoes name not occur than 1 time
    let row_length=percentageTable.rows.length
    for(k=row_length; k<nonduplicate.length+row_length;k++){
        let row = percentageTable.insertRow(k-row_length+1)                                                                                                                      
        row.insertCell(0).className = "count"
        row.insertCell(1).innerHTML = nonduplicate[k-row_length]
        let per = Number.parseFloat(newMarksArray[k-row_length]).toFixed(2)
        let perCell= row.insertCell(2)
        perCell.innerHTML=per+"%"
         //if percentage is less than 33 then change the background color to red
        if(per <33){
        perCell.parentNode.style.background="#F08080"
        }
    }

    //printing the data in table of student whoes name occur more than 1 time
    let row_length_2=percentageTable.rows.length
    for(i=row_length_2;i<duplicateName.length+row_length_2;i++){
        let row = percentageTable.insertRow(i-row_length_2+1)  
        row.insertCell(0).className = "count"
        row.insertCell(1).innerHTML = duplicateName[i-row_length_2]
        // row.insertCell(2).innerHTML=Number.parseFloat(percentage[i-row_length_2]).toFixed(2)+"%"
        let per = Number.parseFloat(percentage[i-row_length_2]).toFixed(2)
        let perCell= row.insertCell(2)
        perCell.innerHTML=per+"%"

        //if percentage is less than 33 then change the background color to red
        if(per <33){
        perCell.parentNode.style.background="#F08080"
    
        }
    }
}
