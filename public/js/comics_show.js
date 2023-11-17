//======================
//SELECT ELEMENTS
//======================

const upvoteBtn = document.getElementById("upvote-btn");
const downvoteBtn = document.getElementById("downvote-btn");

//======================
//ADD EVENT LISTENERS
//======================
upvoteBtn.addEventListener( "click" , async function() {
//build fetch options
 const options = {
	 method:"POST",
	 headers:{
		 'Content-Type':'application/json'
	 },
	 body: JSON.stringify({vote: 'up'})
 }
//send fetch request
 await fetch("/comics/vote",options)
	.then(data => {
	 return data.json()
     })
	.then(res => {
	 console.log(res)
     })
	.catch(err => {
	 console.log(err)
     })
});