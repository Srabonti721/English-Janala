// frequent button clicked
document.getElementById("faq-btn").addEventListener("click",function(){
const frequent= document.getElementById("frequent")
frequent.scrollIntoView({
   behavior:"smooth"
})
})
// Vocabularies button clicked
document.getElementById("learn-btn").addEventListener("click",function(){
const frequent= document.getElementById("vocabularie")
frequent.scrollIntoView({
   behavior:"smooth"
})
})
//  all button load display
const loadLevelData = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res =>res.json())
    .then(data => displayLevelData(data.data))
}

const displayLevelData = (datas) =>{
// console.log(datas);
const btnContainer = document.getElementById("learn-btn-container")
datas.forEach(data => {
   //  console.log(data.level_no);
   const div = document.createElement("div");
   div.innerHTML=`
          <div class="learn">
                    <button onclick="loadSingleBtnData(${data.level_no})" class="btn primary-color"><img src="assets/fa-book-open.png" alt="">Learn-${data.level_no}</button>
                </div>
   `
   btnContainer.append(div)
});
}
// single button data load display
const loadSingleBtnData = (level) =>{
    const url = `https://openapi.programming-hero.com/api/level/${level}`
   //  console.log(url);
   fetch(url)
   .then(res => res.json())
   .then(data =>displaySingleBtnData(data.data))
}

const displaySingleBtnData = (allDatas) =>{
  
   const cardContainer = document.getElementById("card-container")
   cardContainer.innerText = " ";

   if(allDatas== 0){
      cardContainer.innerHTML = `
      <div class=" col-span-full flex flex-col justify-center items-center my-5">
    <img class="w-[150px]" src="assets/alert-error.png" alt="">
    <h2 class="text-sm text-[#79716B] my-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
    <p class="font-medium text-3xl">নেক্সট Lesson এ যান</p>
</div>
      `
      return
   }
   for(let data of allDatas){
// console.log(data);
const cardContainerDiv = document.createElement("div")
cardContainerDiv.innerHTML=`
    <div class="card shadow-sm card-border bg-base-100 px-2 py-10">
  <div class="text-center space-y-2">
      <h2 class="font-bold text-2xl">${data.word}</h2>
    <h3 class="font-medium text-sm">meaning/pronunciation</h3>
   <p class="text-2xl font-semibold">${data.meaning}/${data.pronunciation}</p>
  </div>
    <div class="flex justify-between items-center mt-2 ">
      <button class="btn">
        <img class="w-8" src="https://img.icons8.com/?size=64&id=hSqH00VDLIBm&format=png" alt="">
      </button>
      <button class="btn">
        <img src="https://img.icons8.com/?size=24&id=87092&format=png" alt="">
      </button>
    </div>
</div>
`
cardContainer.append(cardContainerDiv)

   }
   
}

loadLevelData()