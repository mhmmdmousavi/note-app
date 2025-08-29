const register_btn = document.getElementById("register-btn")

register_btn.addEventListener("click", (e) => {
    const username = document.getElementById("input1").value
    const password = document.getElementById("input2").value
    const email = document.getElementById("input3").value

    register(username, password, email)

})

async function register(username, password, email) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({username ,password, email})
        });
        if (response.ok) {
            window.location.href = "login.html";
        }
        console.log("error in post method");
        
    } catch (error) {
        console.log(error);
        
    }
}