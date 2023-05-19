const searchButton1 = document.getElementById("searchButton1");
const searchButton2 = document.getElementById("searchButton2");
const winnerName = document.getElementById("winnerName");
const winnerRepos = document.getElementById("winnerRepos");
const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector(".menu");
const searchButton3=document.getElementById("searchButton3")
let p1_inputElement,p2_inputElement
let  p1_reposCount,p2_reposCount
let  p1_followersCount,p2_followersCount
let  p1_avatarUrl,p2_avatarUrl
const main=document.querySelector("main")
let ctr=1
let flag =false
searchButton1.addEventListener("click", () => {

  searchUser(1);
  ctr++
});
searchButton3.addEventListener("click", () => {
location.reload();
 
});

searchButton2.addEventListener("click", () => {
  searchUser(2);
  flag=true
});

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("menu-open");
  menuIcon.classList.toggle("menu-closed");
});
window.onload = function() {
  const currentTheme = localStorage.getItem("theme");
  const toggleSwitch = document.getElementById("toggleSwitch");

  if (currentTheme) {
    
    if (currentTheme === "dark") {
      document.body.setAttribute("data-theme", currentTheme);
    main.style.background=`black`
    
      toggleSwitch.checked = true;
    }else{
      document.body.setAttribute("data-theme", currentTheme);
      main.style.background=`white`
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.body.setAttribute("data-theme", "dark");
      main.style.background="black"
      //document.querySelector('.navbar').className='navbar navbar-expand-lg  navbar-dark bg-dark'
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      main.style.background="white"

      //document.querySelector('.navbar').className='navbar navbar-expand-lg navbar-light bg-light'
      localStorage.setItem("theme", "light");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);
}
async function searchUser(userNumber) {
  const inputElement = document.getElementById(`searchInput${userNumber}`);
  const username = inputElement.value.trim();
  const userInfo = document.getElementById(`userInfo${userNumber}`);

  if (username === "") {
    alert("Please enter a Github username");
    return;
  }

  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();

  if (response.status === 200) {
    if(userNumber%2==0){
     p2_reposCount = userData.public_repos;
     p2_followersCount = userData.followers;
     p2_avatarUrl = userData.avatar_url;
     inputElement.value = "";
    inputElement.placeholder = "Enter Github username";
    userInfo.innerHTML = `
      <img src="${p2_avatarUrl}" alt="${username}'s avatar"  width="200px"height="200px">
      <h3>${username}</h3>
      <p>Followers: ${p2_followersCount}</p>
      <p>Repos: ${p2_reposCount}</p>
    `;
    userInfo.style.display = "block";

    showWinner();
    }
    else{
      p1_reposCount = userData.public_repos;
      p1_followersCount = userData.followers;
      p1_avatarUrl = userData.avatar_url;
      inputElement.value = "";
    inputElement.placeholder = "Enter Github username";
    userInfo.innerHTML = `
      <img src="${p1_avatarUrl}" alt="${username}'s avatar" width="200px"height="200px">
      <h3>${username}</h3>
      <p>Followers: ${p1_followersCount}</p>
      <p>Repos: ${p1_reposCount}</p>
    `;
    userInfo.style.display = "block";

    showWinner();
    }
    
  } else {
    alert("User not found, please check the username and try again");
  }
}

function showWinner() {
if(flag){
  if(p1_reposCount>p2_reposCount){
  document.getElementById(`winnerRepos`).innerText = `User 1 won with ${p1_reposCount} repos`;
  searchButton1.parentElement.style.background="blue"
  }
else if(p1_reposCount<p2_reposCount){
  document.getElementById(`winnerRepos`).innerText = `User 2 won with ${p2_reposCount} repos`;
  searchButton2.parentElement.style.background="blue"

}
else{
  searchButton2.parentElement.style.background="green"
  searchButton1.parentElement.style.background="green"

  document.getElementById(`winnerRepos`).innerText = `draw`;
}
}
}