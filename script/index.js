// chalange part
function showLoading() {
   document.getElementById("loading").classList.remove("hidden")
   document.getElementById("card-container").classList.add("hidden")
}
function hideLoading() {
   document.getElementById("loading").classList.add("hidden")
   document.getElementById("card-container").classList.remove("hidden")
}
document.getElementById("get-started").addEventListener("click", function (event) {
   event.preventDefault();
   // console.log("click");
   const inputName = document.getElementById("input-name").value;
   const inputPassword = document.getElementById("input-password").value;
   const convertedPassword = parseInt(inputPassword)
   // console.log(typeof inputName, typeof convertedPassword);
   if (typeof inputName === "string") {
      if (convertedPassword === 123456) {
         console.log("doen");
         hideSection()
      }
      else {
         alert("wrong password . contact admin to get your login code")
      }
   }
   else {
      alert("invalid input")
   }
})

function hideSection() {
   document.getElementById("nav-hide").classList.remove("hidden")
   document.getElementById("vocabularie").classList.remove("hidden")
   document.getElementById("frequent").classList.remove("hidden")
   document.getElementById("hero-hidden").classList.add("hidden")
}

document.getElementById("faq-btn").addEventListener("click", function () {
   const frequent = document.getElementById("frequent")
   frequent.scrollIntoView({
      behavior: "smooth"
   })
})
// Vocabularies button clicked
document.getElementById("learn-btn").addEventListener("click", function () {
   const frequent = document.getElementById("vocabularie")
   frequent.scrollIntoView({
      behavior: "smooth"
   })
})

// remove active class
function removeActiveClass() {
   const clickBtn = document.getElementsByClassName("active");
   for (let btn of clickBtn) {
      btn.classList.remove("active")
   }
}
// load card details
const loadCardDetails = (id) => {
   showLoading()
   // console.log(id);
   const url = `https://openapi.programming-hero.com/api/word/${id}`
   // console.log(url);
   fetch(url)
      .then(res => res.json())
      .then(data => displayCardDetails(data.data))

}

const displayCardDetails = (cardDetails) => {
   // console.log(CardDetails);
   document.getElementById("card_details").showModal()
   const detailsContainer = document.getElementById("details-container")
   detailsContainer.innerHTML = `
<div class = "space-y-2">
   <h1 class="font-semibold text-3xl">${cardDetails.word}</h1>
   <h2 class="font-semibold text-xl ">meaning</h3>
   <p>${cardDetails.meaning}</p>
</div>
<div class = "space-y-1 my-4">
   <h2 class="font-semibold text-xl ">Example</h3>
    <p>${cardDetails.sentence}</p>
</div>
<div class="my-4">
   <h1 class="font-semibold text-xl my-2">সমার্থক শব্দ গুলো</h1>
<button class ="btn">${cardDetails.synonyms[0]}</button>
<button class ="btn mx-4">${cardDetails.synonyms[1]}</button>
<button class ="btn">${cardDetails.synonyms[2]}</button>
</div>
   `
   hideLoading()
}
//  all button load display
const loadLevelData = () => {

   // console.log(data);

   fetch('https://openapi.programming-hero.com/api/levels/all')
      .then(res => res.json())
      .then(data => {
         displayLevelData(data.data)
      })
}

const displayLevelData = (datas) => {

   // console.log(datas);
   const btnContainer = document.getElementById("learn-btn-container")
   datas.forEach(data => {
      //  console.log(data.level_no);
      const div = document.createElement("div");
      div.innerHTML = `
                    <button id="btn-${data.level_no}" onclick="loadSingleBtnData(${data.level_no})" class="btn  primary-color  "><img src="assets/fa-book-open.png" alt="">Learn-${data.level_no}</button>      
   `
      btnContainer.append(div)
   });

}
// single button data load display
const loadSingleBtnData = (level) => {
   showLoading()
   const url = `https://openapi.programming-hero.com/api/level/${level}`
   //  console.log(url);
   fetch(url)
      .then(res => res.json())
      .then(data => {
         removeActiveClass()
         const clickBtn = document.getElementById(`btn-${level}`)
         // console.log(clickBtn);
         clickBtn.classList.add("active")
         displaySingleBtnData(data.data)
      })
}

const displaySingleBtnData = (allDatas) => {

   const cardContainer = document.getElementById("card-container")
   cardContainer.innerText = " ";

   if (allDatas == 0) {
      cardContainer.innerHTML = `
      <div class=" col-span-full flex flex-col justify-center items-center my-20">
    <img class="w-[150px]" src="assets/alert-error.png" alt="">
    <h2 class="text-sm text-[#79716B] my-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
    <p class="font-medium text-3xl">নেক্সট Lesson এ যান</p>
</div>
      `
      hideLoading()
      return
   }
   for (let data of allDatas) {
      // console.log(data);
      const cardContainerDiv = document.createElement("div")
      cardContainerDiv.innerHTML = `
    <div class="card shadow-sm card-border bg-base-100 px-2 py-10">
  <div class="text-center space-y-2">
      <h2 class="font-bold text-2xl">${data.word}</h2>
    <h3 class="font-medium text-sm">meaning/pronunciation</h3>
   <p class="text-2xl font-semibold">${data.meaning}/${data.pronunciation}</p>
  </div>
    <div class="flex justify-between items-center mt-2 ">
      <button onclick="loadCardDetails('${data.id}')" class="btn">
        <img class="w-8" src="https://img.icons8.com/?size=64&id=hSqH00VDLIBm&format=png" alt="">
      </button>
      <button class="btn">
        <img src="https://img.icons8.com/?size=24&id=87092&format=png" alt="">
      </button>
    </div>
</div>
`
      cardContainer.append(cardContainerDiv);
   }
   hideLoading()
}
loadLevelData()
