// let clientSecret='58b836a5647bed6c12e39d7e9802b3b56916a910'
// let clientID='3e183062865c00579c24'
// search = 'mohammadaldoer'
// let  URL=`https://api.github.com/search/users?q=${search}&client_id=${clientID}&client_secret=${clientSecret}`
// fetch(URL)
// .then((response) => response.json())
// .then((repositories) => {
// console.log(repositories.items[0].repos_url)
// let x=repositories.items[0].repos_url
// fetch(x)
// .then((response) => response.json())
// .then((repositories) => {
// console.log(repositories)

// })
// })
const searchButton1 = document.getElementById("searchButton1");
const searchButton2 = document.getElementById("searchButton2");
const winnerName = document.getElementById("winnerName");
const winnerRepos = document.getElementById("winnerRepos");
const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector(".menu");
let p1_inputElement,p2_inputElement
let  p1_reposCount,p2_reposCount
let  p1_followersCount,p2_followersCount
let  p1_avatarUrl,p2_avatarUrl

let ctr=1
let flag =false
searchButton1.addEventListener("click", () => {
  searchUser(1);
  ctr++
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
  const toggleSwitch = document.getElementById("toggleSwitch");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.body.setAttribute("data-theme", "dark");
      document.querySelector('.navbar').className='navbar navbar-expand-lg  navbar-dark bg-dark'
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      document.querySelector('.navbar').className='navbar navbar-expand-lg navbar-light bg-light'
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
      <img src="${p2_avatarUrl}" alt="${username}'s avatar">
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
      <img src="${p1_avatarUrl}" alt="${username}'s avatar">
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
  if(p1_reposCount>p2_reposCount)
  document.getElementById(`winnerRepos`).innerText = `player one won with ${p1_reposCount} repos`;
else if(p1_reposCount<p2_reposCount){
  document.getElementById(`winnerRepos`).innerText = `player two won with ${p2_reposCount} repos`;

}
else{
  document.getElementById(`winnerRepos`).innerText = `draw`;
}
}
  // const otherUserNumber = userNumber === 1 ? 2 : 1;
  // const otherUserReposCount = parseInt(document.getElementById(`winnerRepos${otherUserNumber}`).textContent);
  // const winner = reposCount > otherUserReposCount ? username : document.getElementById(`winnerName${otherUserNumber}`).textContent;
  // const winnerReposText = reposCount > otherUserReposCount ? `${reposCount} repos` : `${otherUserReposCount} repos`;
  // const winnerNameElement = document.getElementById(`winnerName`);
  // const winnerReposElement = document.getElementById(`winnerRepos`);

  // winnerNameElement.textContent = winner;
  // winnerReposElement.textContent = winnerReposText;

  // if (otherUserReposCount > 0) {
  //   document.getElementById(`winnerRepos`).innerText = `${otherUserReposCount} repos`;
  // }
}