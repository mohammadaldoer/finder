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
    document.body.setAttribute("data-theme", currentTheme);
   if (currentTheme === "dark") {
      toggleSwitch.checked = true;
      document.querySelector('.navbar').className='navbar navbar-expand-lg  navbar-dark bg-dark'

    }
     else{
      document.querySelector('.navbar').className='navbar navbar-expand-lg navbar-light bg-light'

    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.body.setAttribute("data-theme", "dark");
      document.querySelector('.navbar').className='navbar navbar-expand-lg  navbar-dark bg-dark'
      document.getElementById("show_cont").style.background="black"
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      document.querySelector('.navbar').className='navbar navbar-expand-lg navbar-light bg-light'
     document.getElementById("show_cont").style.background="white"

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
let x=`https://api.github.com/users/${theInput.value}`


function getAllRepos(){
    if (theInput.value == "") {
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
      } else {
         let ctr=0
         try{
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
      }
       catch(error )
        {
          console.error(error); // log the error to the console
          alert("An error occurred while fetching repositories data: " + error.message); // display an error message to the user
        };  
      }}
// // Get Repos Function
function getRepos() {
  if (theInput.value == "") { // If Value Is Empty
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {  
     let ctr=0
     try{
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
         let circle=document.createElement("div")
         circle.style.width="10px"
         circle.style.height="10px"
         circle.borderRadius='50%'
            if( repo.language=="HTML")
            circle.style.backgroundColor="red"
               else if( repo.language=="JavaScript"){
                 circle.style.backgroundColor="blue"
   
               }else{
                   circle.style.backgroundColor="yellow"

               }
            // circle.style.marginTop='10px'
        lang.style.marginTop="30px";
        mainDiv.appendChild(lang)
        mainDiv.appendChild(circle)
        mainDiv.className = 'repo-box';
        reposData.appendChild(mainDiv);
      }
      im.src=repositories[0].owner.avatar_url
      console.log(repositories)
      namee.innerText=repositories[0].owner.login
      
      

   google.charts.load("current", { packages: ["calendar"] });
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {
     var dataTable = new google.visualization.DataTable();
     dataTable.addColumn({ type: "date", id: "Date" });
     dataTable.addColumn({ type: "number", id: "contribute" });
     for (let i = 0; i < repositories.length; i++) {
       const yearr = repositories[i].created_at.slice(0, 4);
       const monthh = repositories[i].created_at.slice(5, 7);
       const dayy = repositories[i].created_at.slice(8, 10);
       if(yearr=="2023")
       dataTable.addRows([[new Date(yearr, monthh, dayy), 37900 + i]]);
     }
     var chart = new google.visualization.Calendar(
       document.getElementById("show_cont")
     );

     var options = {
       title: "repo contribution data ",
       height: 600,
     };

     chart.draw(dataTable, options);
      } 
    });}
    catch(error){
      {
        console.error(error); // log the error to the console
        alert("An error occurred while fetching repositories data: " + error.message); // display an error message to the user
      }; 
    }
  }
}
