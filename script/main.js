// ___________________________________________display Buttons_________________________________________________

let container = ''
function displayFiltersBtn() {
    
  container = filterBtnsTextContent?.map((item,idx) => {
    return  `
            <div class=" flex-col items-center justify-content relative hidden md:flex " id='${item.name}'>
            <button onclick="filterCollapseList(${idx})"  class="filterBtn border-[#a9b1cc] border font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
              ${item.name}
              <span class="ms-[15px]"><i class="arrow fa-solid fa-angle-down transition-all duration-[0.3s]"></i></span>
            </button>
              <!-- Dropdown menu -->
              <div  class=" hidden transition-all duration-[0.3s] w-[300px] left-0 dropList z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-[100%]">
              <ul class="p-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
               
                ${
                    item.dropdownData?.map((ele,idx) =>{
                  
                        return`
                        <li class='p-4 lg:flex hidden' onchange='addFilter(event)'>
                            <input onchange="checkBlueSign(event)"  class='me-[10px]' type="checkbox" id="${ele.split(" ").join("_") + '_Top'}" name="${ele}" value="${ele}" checkOtherInput="${ele.split(" ").join("_") + '1'}" headerDropList='${item.name.split(" ").join("_")}'>
                            <label onclick="checkToGeather(event)" class='text-[16px] block truncate w-[250px]' for="${ele.split(" ").join("_") + '_Top'}" checkOtherInput="${ele.split(" ").join("_") + '1'}"> ${ele}</label>
                        </li>
                        `
                    }).join('')
                }
            </ul>
              </div> 
          </div>
            `
    }).join('')
   

    document.getElementById('filter_sec').insertAdjacentHTML("afterbegin", container);
}

displayFiltersBtn()
// to show colapse dropdown and hide
function filterCollapseList(e){
  document.querySelectorAll('.dropList')[e].classList.toggle('hidden')
  document.querySelectorAll('.arrow')[e].classList.toggle('rotate-180')
  for(let i=0; i<document.querySelectorAll('.dropList').length; i++){
    if(document.querySelectorAll('.dropList')[i] !== document.querySelectorAll('.dropList')[e] && document.querySelectorAll('.arrow')[i] !== document.querySelectorAll('.arrow')[e]){
      document.querySelectorAll('.dropList')[i].classList.add('hidden')
      document.querySelectorAll('.arrow')[e].classList.toggle('rotate-180')
      document.querySelectorAll('.arrow')[i].classList.remove('rotate-180')
    }
  }

}
// _________________________________ADD filter___________________________________________________________
 let container2 = ''
 let uniqueArray = []
 let showElementsFilter =  []  
  function addFilter(event){
    if(event.target.checked === true){
      showElementsFilterd(event)
    }else if(event.target.checked === false){
    // Remove Elements Filtered
      toggleCheckbox(event)
    }
 }
 // _______________________________show which element Filtered________________________________________________

 // _______________________________show which element Filtered________________________________________________
 function showElementsFilterd(event){

  showElementsFilter.push(event.target.value)
  // --------uniqueArray-ازاله التكرار فى المصفوفه ----------
  let see = new Set();
  showElementsFilter = showElementsFilter.filter(item => {
  
   let keyValue = Object.entries(item).map(([key, value]) => `${key}:${value}`).join('|')
   if (see.has(keyValue)) {
     return false;
 } else {

     see.add(keyValue);
     return true;
 }
});


 }
 // _________________________________remove Element which Filtered _________________________________________
 function removeElementFilterd(event){
  showElementsFilter = showElementsFilter?.filter(item => item !== event.target.value)
  console.log(event.target.value)
  console.log(showElementsFilter)
 }
 // ____________________________________display Cards______________________________________
function removeElementXmark(event){
  document.getElementById(`${event.target.getAttribute("for").split(" ").join("_") + "_Top"}`).checked = false
  document.getElementById(`${event.target.getAttribute("for").split(" ").join("_") + "1"}`).checked = false
 }
 // ____________________________________display Cards______________________________________
let container4 = ''
let container5 = ''
 function displayCardsWhenStart(){
  
           container4=  data.map((ele,idx) => {
               return`
  
               <div class=" ${ele.filterData.map(item=>item).join(" ")} w-[100%]  md:w-[500px] lg:w-[450px]  cardSidebar border border-[#d7dae8] rounded-[10px]"  _cardDetails="${ele.itemDetails}">
                 <div class="sidebar flex flex-col">
                   <div class="card p-[15px]">
                     <div class="flex my-[2px] items-center">
                       <div class="mx-[10px]">
                       <span><img src="${ele.logo}" alt="logo"></span>
                       </div>
                       <div class="ms-[10px]">
                         <h2 class="faculty_header">${ele.university_name}</h2>
                         <span class="faculty_location">${ele.Location}</span>
                       </div>
                     </div>
                     <div class="my-[5px] flex justify-between items-center">
                     <h3 >${ele.caption}</h3>
                     <button onclick='showCardDetails(event,"${ele.itemDetails}")' class=' hidden lg:block text-[#000] text-[15px] underline px-4 py-2   mx-[10px]'>Show Details</button>
                     </div>
                     <div class="flex justify-between">
                       <p class="py-[10px] w-[65%]"><span class="me-4 w-[100%] flex">${ele.program_level}</span></p>
                     </div>
                   </div>
                  
                 </div>
               </div>
                  
                 </div>
               </div>
  
  
              `
            }).join("")
            document.getElementById('displayCardsSidebar').innerHTML = container4
// ___________________________display first card details when app start_______________________________________________________
            container5 = `
            <div class=' w-[100%] rounded-[10px]'>
              <div class='bg-[url("${data[0].img_cover}")] w-[100%] h-[200px] bg-center bg-cover'>
              </div>
              <div class="flex my-[2px] items-center">
                <div class="m-[40px]">
                  <span><img src="${data[0].logo}" alt="logo"></span>
                </div>
                <div class="ms-[10px]">
                  <h2 class="faculty_header text-[25px]">${data[0].university_name}</h2>
                  <span class="faculty_location text-[#363b51]"><i class="fa-solid fa-location-dot me-[5px] "></i>${data[0].Location}</span>
                </div>
              </div>
              <div class='m-[40px]'>
                <p class='text-[20px] underline'>${data[0].caption.toUpperCase()}</p>
              </div>
              <div class='m-[40px]'>
              <button type="button" class="w-[200px] py-[15px]  max-[600px]:hidden text-white bg-blue-700 font-medium rounded-lg text-[15px] px-4 py-2 text-center w-[100px] mx-[10px]">Check Eligibility Now</button>
              </div>
              <div class='m-[40px]'>
              <h3 class='text-lg'>Program Summary</h3>
                <p class='text-[#363b51]'>
                ${data[0].Summary}
                </p>
              </div>

            </div>
            
            `
            document.getElementById("displayCardDetails").innerHTML = container5
           
       }
       displayCardsWhenStart()
    // __________________________________________________________
    
 function checkToGeather(event){
  if(document.getElementById(`${event.target.getAttribute("for")}`).checked === false){
      document.getElementById(`${event.target.getAttribute("checkotherinput")}`).checked = true
  }else{
    document.getElementById(`${event.target.getAttribute("checkotherinput")}`).checked = false
  }
    
   }
   function checkBlueSign(event){
    if(event.target.checked == false){
      document.getElementById(`${event.target.getAttribute("checkotherinput")}`).checked = false 
    }else{
      document.getElementById(`${event.target.getAttribute("checkotherinput")}`).checked = true
    }
   }
  
// __________________________________Filter cards_________________________________________

       var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
       var allCards = Array.from(document.querySelectorAll('.cardSidebar'));
       var checked = {};


      getChecked('Location');
      getChecked('Program_level');
      getChecked('Discipline');

      Array.prototype.forEach.call(allCheckboxes, function (el) {
        el.addEventListener('click', toggleCheckbox);
      });

      function toggleCheckbox(e) {
        getChecked(e.target.getAttribute(`headerdroplist`));
        setVisibility()
      }

      function getChecked(name) {
        checked[name] = Array.from(document.querySelectorAll('input[headerdroplist=' + name + ']:checked')).map(function (el) {return el.value.split(" ").join("_");});
      }
      function setVisibility() {
        allCards.map(function (el) {
          let Location = checked.Location.length ? Array.from(el.classList).filter(n => checked.Location.indexOf(n) !== -1).length : true;
          let Program_level = checked.Program_level.length ? Array.from(el.classList).filter(n => checked.Program_level.indexOf(n) !== -1).length : true;
          let Discipline = checked.Discipline.length ? Array.from(el.classList).filter(n => checked.Discipline.indexOf(n) !== -1).length : true;
          if (Location && Program_level && Discipline) {
            el.style.display = 'block';
          } else {
            el.style.display = 'none';
          }
        });
      }
// _______________________________All Filters Open & close____________________________________
function closeList(){
  document.getElementById('sidelist').classList.remove('w-[100%]')
  document.getElementById('sidelist').classList.add('w-0')
  document.getElementById('sidelist').classList.remove('opacity-[1]')
  document.getElementById('sidelist').classList.add('opacity-[0]')
}
function openList(){
  document.getElementById('sidelist').classList.add('w-[100%]')
  document.getElementById('sidelist').classList.remove('w-0')
  document.getElementById('sidelist').classList.add('opacity-[1]')
  document.getElementById('sidelist').classList.remove('opacity-[0]')
}
function droplistInside(e){
console.log(e.target.nextSibling.nextSibling.classList.toggle('hidden'))
}
// _______________________________________________________________________________
let container6 =''
function showCardDetails(event,details){
  console.log(details.split(","))
  console.log(event.target)

  let cardDetail = data.filter(item => item.itemDetails == details)
  container6 = cardDetail.map(ele => {
    return`
    <div class=' w-[100%] rounded-[10px]'>
              <div class='bg-[url("${ele.img_cover}")] w-[100%] h-[200px] bg-center bg-cover'>
              </div>
              <div class="flex my-[2px] items-center">
                <div class="m-[40px]">
                  <span><img src="${ele.logo}" alt="logo"></span>
                </div>
                <div class="ms-[10px]">
                  <h2 class="faculty_header text-[25px]">${ele.university_name}</h2>
                  <span class="faculty_location text-[#363b51]"><i class="fa-solid fa-location-dot me-[5px] "></i>${ele.Location}</span>
                </div>
              </div>
              <div class='m-[40px]'>
                <p class='text-[20px] underline'>${ele.caption.toUpperCase()}</p>
              </div>
              <div class='m-[40px]'>
              <button type="button" class="w-[200px] py-[15px]  max-[600px]:hidden text-white bg-blue-700 font-medium rounded-lg text-[15px] px-4 py-2 text-center w-[100px] mx-[10px]">Check Eligibility Now</button>
              </div>
              <div class='m-[40px]'>
              <h3 class='text-lg'>Program Summary</h3>
                <p class='text-[#363b51]'>
                ${ele.Summary}
                </p>
              </div>

            </div>
    
    `
  })
   document.getElementById("displayCardDetails").innerHTML = container6
}





