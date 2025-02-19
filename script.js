// import { countryList } from "./codes.js";
// const countryList =require("./codes.js")
// console.log(countryList)


const baseUrl =   "https://latest.currency-api.pages.dev/v1/currencies";


const dropDown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector(".btn")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const mssg = document.querySelector(".mssg")
const switchCurrency = document.querySelector(".dropdown i")


window.addEventListener("load", ()=>{
    updateExchangeRate();
})


for (let select of dropDown){
    for (currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if (select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
       } else if (select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
       }
       select.append(newOption);

    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })

}


const updateFlag =(element)=>{
   let currCode= element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
};

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    updateExchangeRate();    
});

const updateExchangeRate = async ()=>{
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal = 1
        amount.value = "1"
    }
    let Url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(Url)
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()]?.[toCurr.value. toLowerCase()];
    let finalAmount = amtVal * rate;
    mssg.innerHTML = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

switchCurrency.addEventListener("click", ()=>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);   
    updateExchangeRate(); 
 

    
})