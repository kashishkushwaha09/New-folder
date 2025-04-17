function handleFormSubmit(event){
    event.preventDefault();
    const user={
        username: event.target.username.value,
        email:event.target.email.value,
        phone:event.target.phone.value
    }
    const users=JSON.parse(localStorage.getItem("users"))|| [];
    let isUniqueEmail=true;
    users.forEach((eachUser)=>{
        if(eachUser.email=== user.email){
            isUniqueEmail=false;
            alert("this email is already Listed!!");
        }
    })
    if(isUniqueEmail){
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users));
        displayUsers();
        event.target.reset();
        event.target.username.focus();
    }
}
function displayUsers(){
    const userLists=document.querySelector('ul');
    userLists.innerHTML='';
    const users=JSON.parse(localStorage.getItem("users"))|| [];
    users.forEach((user)=>{
        const li=document.createElement('li');
        li.innerHTML=`${user.username} ${user.email} ${user.phone} `;
        const button=document.createElement('button');
        button.textContent='Delete';
        button.addEventListener('click',function(){
            deleteUsers(user.email);
        })
        li.appendChild(button);
        userLists.appendChild(li);
    })
}
function deleteUsers(email){
const users=JSON.parse(localStorage.getItem("users"))|| [];
const filteredUsers=users.filter((user)=>user.email!== email);
localStorage.setItem("users",JSON.stringify(filteredUsers));
displayUsers();
}
window.addEventListener('DOMContentLoaded',displayUsers);