const adding_btn = document.getElementById("div1-div1-btn1")
const input = document.getElementById("div1-div1-div1-textarea")


adding_btn.addEventListener("click", (e) => {
    create_new_textarea()
})
let counter = 0;

function create_new_textarea() {
    counter++
    const textareaID = "textarea-" + counter
    console.log(typeof textareaID);
    
    const container = document.getElementById("div1-div1")
    const div = document.createElement("div")
    div.classList.add("div1-div1-div1")
    div.innerHTML = `
                <textarea id="${textareaID}" placeholder="take your note here..." class="div1-div1-div1-textarea"></textarea>
                <div>
                    <button class="div1-div1-div1-btn" id="div1-div1-div1-btn2"><img src="images/Vector (2).png" alt=""></button>
                </div>`
    container.appendChild(div)
    const remove_btn = div.querySelector(".div1-div1-div1-btn")

    remove_btn.addEventListener("click", (e)=> {
        div.remove()
    })
}
function saving_notes() {
    const allnotes = []
    const textarea_array = document.querySelectorAll(".div1-div1-div1-textarea")
        
    textarea_array.forEach(textarea =>{
        allnotes.push(textarea.value)
    })
    localStorage.setItem("notes", JSON.stringify(allnotes))
}

window.addEventListener("beforeunload", (e)=> {
    saving_notes()
})

function load_notes() {
    saved_notes = JSON.parse(localStorage.getItem("notes"))
    saved_notes.forEach((notes)=>create_saved_textarea(notes))
}

function create_saved_textarea(notes) {
    counter++
    const textareaID = "textarea-" + counter
    console.log(typeof textareaID);
    
    const container = document.getElementById("div1-div1")
    const div = document.createElement("div")
    div.classList.add("div1-div1-div1")
    div.innerHTML = `
                <textarea id="${textareaID}" placeholder="take your note here..." class="div1-div1-div1-textarea">${notes}</textarea>
                <div>
                    <button class="div1-div1-div1-btn" id="div1-div1-div1-btn2"><img src="images/Vector (2).png" alt=""></button>
                </div>`
    container.appendChild(div)
    const remove_btn = div.querySelector(".div1-div1-div1-btn")

    remove_btn.addEventListener("click", (e)=> {
        div.remove()
    })
}
document.addEventListener("DOMContentLoaded", load_notes)

    