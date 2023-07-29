let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')

function render(leads) {
    let listItems = ""
    for (let index = 0; index < leads.length; index++) {
        listItems += `
            <li>
                <a href= '${leads[index]}' target = '_blank'> 
                    ${leads[index]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems   
}

/*const li = document.createElement("li")
    li.textContent = myLeads[index]
    ulEl.append(li)*/

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage
        render(myLeads)
}

deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)  
    })
})
