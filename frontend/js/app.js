const adding_btn = document.getElementById("div1-div1-btn1");
const input = document.getElementById("div1-div1-div1-textarea");


adding_btn.addEventListener("click", (e) => {
  create_new_textarea();
});


let counter = 0;
function create_new_textarea() {
  counter++;
  const textareaID = "textarea-" + counter;
  console.log(typeof textareaID);

  const container = document.getElementById("div1-div1");
  const div = document.createElement("div");
  div.classList.add("div1-div1-div1");
  div.innerHTML = `
                <textarea id="${textareaID}" placeholder="take your note here..." class="div1-div1-div1-textarea"></textarea>
                <div>
                    <button class="div1-div1-div1-btn" id="div1-div1-div1-btn2"><img src="images/Vector (2).png" alt=""></button>
                </div>`;
  container.appendChild(div);
  const remove_btn = div.querySelector(".div1-div1-div1-btn");

  remove_btn.addEventListener("click", (e) => {
    div.remove();
  });
  create_note(input)
}


// function saving_notes() {
//   const allnotes = [];
//   const textarea_array = document.querySelectorAll(".div1-div1-div1-textarea");

//   textarea_array.forEach((textarea) => {
//     allnotes.push(textarea.value);
//   });
//   localStorage.setItem("notes", JSON.stringify(allnotes));
// }


input.addEventListener("blur", (e) => {
  update_note(input);
});

async function create_note(input) {
    const token = localStorage.getItem("access")

    const response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method: "post",
        headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({input})
    });
    if (response.ok) {
        console.log("note saved");
        
    } else {
        console.log("failed to save note");
        
    }
}


async function update_note(input) {
    const token = localStorage.getItem("access");

    const response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
        method: 'put',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({input})
    })
    if (response.ok) {
        alert("note updated");
        
    } else {
        alert("updating note failed")
    }
}




// function load_notes() {
//     saved_notes = JSON.parse(localStorage.getItem("notes"));
//     saved_notes.forEach((notes) => create_saved_textarea(notes));
// }


async function get_data() {
    const token = localStorage.getItem("access");

    const response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method : "GET",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    if (response.ok) {
        const notes = await response.json();
        console.log(notes);
        notes.forEach((note) => create_saved_textarea(note))
    }
    else{
        console.log("getting data failed");
        
    }
}


async function create_saved_textarea(notes) {
    const note = await notes.json()
    const note_cont = note.content
    counter++;
    const textareaID = "textarea-" + counter;
    console.log(typeof textareaID);

    const container = document.getElementById("div1-div1");
    const div = document.createElement("div");
    div.classList.add("div1-div1-div1");
    div.innerHTML = `
                    <textarea id="${textareaID}" placeholder="take your note here..." class="div1-div1-div1-textarea">${note_cont}</textarea>
                    <div>
                        <button class="div1-div1-div1-btn" id="div1-div1-div1-btn2"><img src="images/Vector (2).png" alt=""></button>
                    </div>`;
    container.appendChild(div);
    const remove_btn = div.querySelector(".div1-div1-div1-btn");

    remove_btn.addEventListener("click", (e) => {
        div.remove();
    });
}


document.addEventListener("DOMContentLoaded", get_data);
