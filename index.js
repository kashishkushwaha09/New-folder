
  // When the page get load display all expenses
document.addEventListener("DOMContentLoaded", display);

  
    // add new expnnse in expenseList array
    function handleFormSubmit(event) {  
 event.preventDefault();
    const expenseData = {
        id: Date.now(), 
        expenceAmount: event.target.expenceAmount.value,
        description: event.target.description.value,
        category: event.target.category.value,

    };

    const editId=sessionStorage.getItem('editId');
    if(editId){
        expenseData.id=Number(editId);
        editData(editId,expenseData) 
    }else{
        addData(expenseData);
    }
 
  
    display();
    }

    // use this function to display expenses on screen
    function display() {
     const expenseList = document.querySelector('ul');
     expenseList.innerHTML = '';

     const expenseData = JSON.parse(localStorage.getItem('expenseList')) || [];
      console.log(expenseData);
     for (let i = 0; i < expenseData.length; i++) {
         const li = document.createElement('li');
         li.innerHTML = `${expenseData[i].expenceAmount}, ${expenseData[i].description}, ${expenseData[i].category} `;
          li.setAttribute('id',expenseData[i].id);
         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'Delete Expense';
         deleteBtn.className='btn btn-danger p-1 mx-1'
         deleteBtn.addEventListener('click', function () {
             deleteData(expenseData[i].id, li);
         });
         const editBtn = document.createElement('button');
         editBtn.textContent = 'Edit Expense';
         editBtn.className='btn btn-warning p-1 mx-1'
         editBtn.addEventListener('click', function () {
            
            sessionStorage.setItem('editId', expenseData[i].id);
            document.getElementById('expenseAmount').value = expenseData[i].expenceAmount;
            document.getElementById('description').value = expenseData[i].description;
            document.getElementById('category').value = expenseData[i].category;
            const btn = document.querySelector('form button[type="submit"]');
            btn.textContent='update Expense';
        });
         li.appendChild(deleteBtn);
         li.appendChild(editBtn);
         expenseList.appendChild(li);
     }
    }

    // this function to add expense details into local storage
    function addData(expenseData) {
        let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];

        expenseList.push(expenseData);
        localStorage.setItem('expenseList', JSON.stringify(expenseList));
    }


    // this function to delete the expense details from local store and DOM (screen)
    function deleteData(expenseId, liElement) {
        const expenseData = JSON.parse(localStorage.getItem('expenseList')) || [];
        const updatedExpenseData= [];
    
        for (let i = 0; i < expenseData.length; i++) {
            if (expenseData[i].id !== expenseId) {
                updatedExpenseData.push(expenseData[i]);
            }
        }
    
        localStorage.setItem('expenseList', JSON.stringify(updatedExpenseData));
        liElement.remove();
     }
    

    // use this function to update expense details from local storage
    function editData(editId,updatedExpenseData) {
        const expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
  const index = expenseList.findIndex(expense => expense.id === Number(editId));

  if (index !== -1) {
    console.log(updatedExpenseData)
    expenseList[index] = { ...expenseList[index], ...updatedExpenseData };
    localStorage.setItem('expenseList', JSON.stringify(expenseList));
    
    document.getElementById('expenseAmount').value ='';
    document.getElementById('description').value ='';
    document.getElementById('category').value ='';
    const btn = document.querySelector('form button[type="submit"]');
    btn.textContent='Add Expense';
    sessionStorage.removeItem('editId')
    
    }
    }
   