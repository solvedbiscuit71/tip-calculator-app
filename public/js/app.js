/* Amount */
const amountTip = document.getElementById("amount-tip")
const amountTotal = document.getElementById("amount-total")

function updateAmount(){
  const tipAmount = billValue * tipValue / peopleCount
  amountTip.innerText = Math.trunc(tipAmount * 100) / 100
  amountTotal.innerText = Math.round((( billValue / peopleCount ) + tipAmount) * 100) / 100 
}

function resetValue(){
  billInput.value = 142.55
  billValue = 142.55

  tipInput.value = ""
  tipValue = 0.15
  updateTipActive(2)

  peopleInput.value = 5
  peopleInput.classList.remove("input-number--warning")
  peopleCount = 5
  warning.style.display = "none"

  updateAmount()
}

const resetBtn = document.getElementById("reset")
resetBtn.addEventListener('click',resetValue)

/* ------ Billing -------- */
const billInput = document.getElementById("bill")
let billValue

billInput.oninput = () => {
  if (+billInput.value === "") {
    return
  }

  billValue = +billInput.value
  updateAmount()
}

/* ------ Tip ------ */

const tipBtns = document.getElementsByClassName("btn btn--small")
const tipInput = document.getElementById("tip")
let tipValue
let tipActive

function updateTipActive(index){
  if(tipActive !== undefined){
    tipBtns[tipActive].classList.remove('btn--active')
  }

  if(index !== undefined){
    tipActive = index
    tipBtns[tipActive].classList.add('btn--active')
  }
}


for(let i=0;i<tipBtns.length;i++){
  tipBtns[i].addEventListener('click',event => {
    event.preventDefault()

    if (+event.target.dataset.value === "") {
      return
    }
    tipValue = +event.target.dataset.value

    if (+event.target.dataset.index !== ""){
      updateTipActive(+event.target.dataset.index)
    }else {
      updateTipActive()
    }
    updateAmount()
  })
}

tipInput.oninput = () => {
  if (+tipInput.value === "") {
    return
  }
  tipValue = +tipInput.value / 100
  updateTipActive()
  updateAmount()
}


/* ------ No of people -------- */
const peopleInput = document.getElementById("no-of-people")
const warning = document.getElementById("warning")
let peopleCount

peopleInput.oninput = () => {
  const noOfPeople = +peopleInput.value
  if (noOfPeople === "") {
    return
  }

  if (noOfPeople >= 0 && noOfPeople < 1) {
    warning.style.display = "inline"
    peopleInput.classList.add("input-number--warning")
    return
  }

  warning.style.display = "none"
  peopleInput.classList.remove("input-number--warning")

  if (noOfPeople - Math.round(noOfPeople) === 0) {
    peopleCount = noOfPeople
    updateAmount()
  }
}

/* init */
resetValue()
