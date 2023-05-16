let theInput = document.querySelector("#txt");
let btn = document.querySelector("#bt");
let reposData = document.querySelector("#repos");
let im =document.getElementById("imag")
let tar=document.getElementById("tar")
let over=document.getElementById("over")
let pic =document.getElementById("pic")
let namee=document.getElementById("namee")
let followers=document.getElementById("followers")
let following=document.getElementById("following")
btn.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(theInput.value);
  getRepos()
});
tar.addEventListener("click", function(event) {
    event.preventDefault();
   
    getAllRepos()
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
over.onclick=function(){
    getRepos();
    toggleSwitch.addEventListener("change", switchTheme, false);
}
tar.onclick=function(){
    getAllRepos();
    toggleSwitch.addEventListener("change", switchTheme, false);
}
getButton.onclick = function () {
  getRepos();
  toggleSwitch.addEventListener("change", switchTheme, false);
};



  over.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(theInput.value);
    getRepos()
  });
// let calender=document.getElementById("calender")
let clientSecret='58b836a5647bed6c12e39d7e9802b3b56916a910'
let clientID='3e183062865c00579c24'
let x=`https://api.github.com/users/${theInput.value}`
let  URL=`https://api.github.com/search/users?q=${theInput.value}&client_id=${clientID}&client_secret=${clientSecret}`

function getAllRepos(){
    if (theInput.value == "") {
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
      } else {
         let ctr=0
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((repositories) => {
          reposData.innerHTML = '';
         repositories.forEach(repo => {
            let mainDiv = document.createElement("div");
            console.log(repo)
         mainDiv.style.display="grid"
         mainDiv.style.gridTemplateColumns="repeat(2,1fr)"
            let theUrl = document.createElement('a');
            let theUrlText = document.createTextNode(repo.name);
            theUrl.appendChild(theUrlText);
            theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
            theUrl.setAttribute('target', '_blank');
            mainDiv.appendChild(theUrl);
            let pub=document.createElement('div')
            pub.style.border="1px solid gray"
                pub.style.width='60px'
                pub.style.height='25px'
            let pubText=document.createTextNode(repo.visibility)
            pub.appendChild(pubText)
            pub.style.borderRadius='10px'
            pub.style.paddingLeft="5px"

            mainDiv.appendChild(pub)
            let lang=document.createElement("div")
            lang.appendChild(document.createTextNode( repo.language))
             mainDiv.appendChild(document.createElement('br'))
            //  mainDiv.appendChild(document.createElement('br'))
            //  mainDiv.appendChild(document.createElement('br'))
            //  mainDiv.appendChild(document.createElement('br'))
             let circle=document.createElement("div")
             circle.style.width="10px"
             circle.style.height="10px"
             circle.borderRadius='50%'
             circle.style.marginTop='10px'
             lang.style.marginTop='40px'

             if( repo.language=="HTML")
             circle.style.backgroundColor="red"
                else if( repo.language=="JavaScript"){
                  circle.style.backgroundColor="blue"
    
                }else{
                    circle.style.backgroundColor="yellow"

                }
                
            mainDiv.appendChild(lang)
            mainDiv.appendChild(circle)
            mainDiv.className = 'repo-box';
            reposData.appendChild(mainDiv);
          });
        });
}}
// // Get Repos Function
function getRepos() {
  if (theInput.value == "") { // If Value Is Empty
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {  
     let ctr=0
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response) => response.json())
    .then((repositories) => {
      console.log(repositories)
      reposData.innerHTML = '';
        for(repo of repositories){
            if(ctr==6){
                break
            }
            ctr++;
        // Create The Main Div Element
        let mainDiv = document.createElement("div");
        mainDiv.style.padding='50px'
        mainDiv.style.paddingTop='5px'
        mainDiv.style.paddingBottom='80px'
        console.log(repo)
        mainDiv.style.display='grid'
        mainDiv.style.gridTemplateColumns='repeat(2,1fr)'
        let theUrl = document.createElement('a');
        let theUrlText = document.createTextNode(repo.name);
        theUrl.appendChild(theUrlText);
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
        theUrl.setAttribute('target', '_blank');
        mainDiv.appendChild(theUrl);
        let pub=document.createElement('div')
        pub.style.border="1px solid gray"
            pub.style.width='60px'
            pub.style.height='25px'
            pub.style.paddingLeft="5px"
        let pubText=document.createTextNode(repo.visibility)
        pub.appendChild(pubText)
        pub.style.borderRadius='10px'
        mainDiv.appendChild(pub)
        let lang=document.createElement("div")
        lang.appendChild(document.createTextNode( repo.language))
         mainDiv.appendChild(document.createElement('br'))
        //  mainDiv.appendChild(document.createElement('br'))
        //  mainDiv.appendChild(document.createElement('br'))
        //  mainDiv.appendChild(document.createElement('br'))
         let circle=document.createElement("div")
         circle.style.width="10px"
         circle.style.height="10px"
         circle.borderRadius='50%'
         if( repo.language=="HTML")
         circle.style.backgroundColor="red"
            else{
              circle.style.backgroundColor="yellow"

            }
            // circle.style.marginTop='10px'
            lang.style.marginTop='30px'

        mainDiv.appendChild(lang)
        mainDiv.appendChild(circle)
        mainDiv.className = 'repo-box';
        reposData.appendChild(mainDiv);
        }
    });
    fetch(`https://api.github.com/users/${theInput.value}`)
    .then((response) => response.json())
    .then((repositories) => {
      im.src=repositories.avatar_url
      following.innerTexta=`following : ${repositories.following}`
      followers.innerText=`followers : ${repositories.followers}`
      namee.innerText=repositories.login

    });
  }
}