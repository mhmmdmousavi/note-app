const adding_btn = document.getElementById("div1-div1-btn1");


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
  const input = document.getElementById(textareaID);
  create_note(input.value)
  input.addEventListener("blur", (e) => {
        update_note(input.value);
    });

}



async function create_note(input) {
    const token = localStorage.getItem("access")

    const response = await apiFetch("http://127.0.0.1:8000/api/notes/", {
        method: "post",
        body: JSON.stringify({input})
    });
    console.log(response);
    
    if (response.ok) {
        console.log("note saved");
        
    } else {
        console.log("failed to save note");
        
    }
}


async function update_note(input, counter) {

    const response = await apiFetch(`http://127.0.0.1:8000/api/notes/${noteID}/`, {
        method: 'put',
        body:JSON.stringify({input})
    })
    if (response.ok) {
        alert("note updated");
        
    } else {
        alert("updating note failed")
    }
}



async function get_data() {
    const token = localStorage.getItem("access");

    const response = await apiFetch("http://127.0.0.1:8000/api/notes/", {
        method : "GET",
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
    const input = document.getElementById("div1-div1-div1-textarea");
    input.addEventListener("blur", (e) => {
        update_note(input.value);
    });
}


document.addEventListener("DOMContentLoaded", get_data);

async function apiFetch(url, json1 = {}) {
    let access = localStorage.getItem("access");
    json1.headers = {
        ...json1.headers,
        "Authorization": `Bearer ${access}`,
        "Content-Type": "application/json"
    };

    let response = await fetch(url, json1)

    if (response.status ===401) {
        const refreshed = await refreshtoken()
        
        if (refreshed) {
            access = localStorage.getItem("access");
            options.headers["Authorization"] = `Bearer ${access}`;

            response = await fetch(url, options);
        } else {
            alert("Session expired. Please login again.");
            window.location.href = "login.html";
        }
    } 
    return response
}

async function refreshtoken() {
    const refresh = localStorage.getItem("refresh")

    const response = await fetch("http://127.0.0.1:8000/api/accounts/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({refresh}
        )
    })

    if (response.ok) {
        const data = await response.json();

        localStorage.setItem("access", data.access)
        return true
    } else {
        return false
    }
}