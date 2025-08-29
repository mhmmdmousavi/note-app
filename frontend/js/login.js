const login_btn = document.getElementById("login-btn")

login_btn.addEventListener("click", (e) => {
    const username = document.getElementById("input1").value
    const password = document.getElementById("input2").value
    login(username, password)
})


async function login(username, password) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({username ,password})
        });
        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            window.location.href= "note.html";
        }
        console.log("error in post login");

        
    } catch (error) {
        console.log(error);
        
    }
}