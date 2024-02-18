//DOM elements declations
const name = document.getElementById('name')
const age = document.getElementById('age')
const email = document.getElementById('email')
const crudTable = document.getElementById('crudTable')
const addData = document.getElementById('addData')
const tableBody = document.querySelector('tbody')
const UpdateBtn = document.getElementById('update')

//validating the user inputs
const validateForm =()=>{
    
    if(name.value.length === 0){
        alert("Name should not be empty or more than 1 letter")
        return false
    }
    if(age.value < 1){
        alert("Age should be a positive number")
        return false
    }
    if(!email.value.includes('@')){
        alert("Enter a valid email address")
        return false
    }

    return true
}


//creating html elements for every data that getting from local storage
const showData = () => {
    let peopleList;
  
    if(localStorage.getItem('peopleList') === null){
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

   tableBody.innerHTML = ''

 
    peopleList.forEach((element, index) => {
        let tableContent = `<tr>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.address}</td>
            <td>${element.email}</td>
            <td>
               <button class="btn btn-danger" onclick="deleteData(${index})"><span class="material-symbols-outlined">delete</span></button>
               <button class="btn btn-warning" onclick="updateData(${index})"><span class="material-symbols-outlined">update</span></button>
            </td>
        </tr>`;

        tableBody.innerHTML += tableContent;
    });
}

document.onload = showData()


//adding the input values to the local storage and table body
addData.addEventListener('click',()=>{
    
    if(validateForm() == true){
        
        let peopleList;
  
        if(localStorage.getItem('peopleList') === null){
          peopleList = []
        }else{
          peopleList=JSON.parse(localStorage.getItem('peopleList'))
        }
        
        peopleList.push({
            name : name.value,
            age : age.value,
            address : address.value,
            email : email.value,
        })
        localStorage.setItem("peopleList", JSON.stringify(peopleList))

        showData()

        name.value = ''
        age.value = ''
        address.value = ''
        email.value = ''

    }
}
)


//deletion operation by passing index value
const deleteData = (index) => {
    let peopleList;
  
    if(localStorage.getItem('peopleList') === null){
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }


    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData(); 
}

//updation operation by passing index value
const updateData = (index) => {
  let peopleList;

  if (localStorage.getItem('peopleList') === null) {
      peopleList = [];
  } else {
      peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  let personToUpdate = peopleList[index];

  name.value = personToUpdate.name;
  age.value = personToUpdate.age;
  address.value = personToUpdate.address;
  email.value = personToUpdate.email;

 
  UpdateBtn.style.display = 'block';


  UpdateBtn.onclick = () => {
   
      if (validateForm()) {
         
          personToUpdate.name = name.value;
          personToUpdate.age = age.value;
          personToUpdate.address = address.value;
          personToUpdate.email = email.value;

          
          peopleList[index] = personToUpdate;
          localStorage.setItem('peopleList', JSON.stringify(peopleList));

         
          name.value = '';
          age.value = '';
          address.value = '';
          email.value = '';

          
          UpdateBtn.style.display = 'none';

          showData();
      }
  };
};

