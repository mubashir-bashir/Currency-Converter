const Base_Url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

let i = 0 
for(select of dropdowns){
    for(currCode in countryList){
        let newOptions = document.createElement("Option")
        newOptions.innerText = currCode;
        newOptions.value= currCode
        if(select.name === "from" && currCode === "USD")
        {
            newOptions.selected = "selected"
        }
        else if(select.name === 'to' && currCode ==="PKR")
        {
            newOptions.selected= "selectd"
        }
        select.append(newOptions)
    }

    select.addEventListener("change",(e)=>{
        updateFlag(e.target)
        // console.log 
    })
}


const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    if(amtVal === "" || amtVal <1){
        amtVal = 1;
        amount.value = "1"
    }

   const URL = `${Base_Url}/${fromCurr.value.toLowerCase()}.json`

    let response = await fetch(URL)
    let data = await response.json()
    let a = data[fromCurr.value.toLowerCase()]
    // let rate = a.toCurr.toLowerCase()

    rate = a[ `${toCurr.value.toLowerCase()}`]

    let finalAmount = Math.round(amtVal * rate)

    console.log(finalAmount)

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

const updateFlag =(e)=>{
    let currCode = e.value;
    let countryCode = countryList[currCode]
    console.log(countryCode)
    let newSrc =   `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img =  e.parentElement.querySelector("img")
   console.log(img)
   img.src = newSrc
}


btn.addEventListener("click",async(e)=>{
    e.preventDefault()
    updateExchangeRate()
})

window.addEventListener("load",updateExchangeRate)