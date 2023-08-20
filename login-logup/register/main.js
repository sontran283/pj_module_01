let users = JSON.parse(localStorage.getItem('users')) || [];
const handleLogin = () => {
    let username = document.getElementById('username').value;
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('repassword').value;


    if (username.trim() === "") {  // username : không để trống
        document.getElementById("usernameError").innerText = "Không được để trống";
        return;
    } else if (users.findIndex((value) => value.username === username) > -1) {
        document.getElementById("usernameError").innerText = "Đã tồn tại tài khoản này, vui lòng nhập tên khác";
        return;
    } else {
        document.getElementById("usernameError").innerText = "";
    }


    if (fullName.trim() === "") {  // full name  : không để trống
        document.getElementById("fullNameError").innerText = "Không được để trống";
        return;
    } else {
        document.getElementById("fullNameError").innerText = "";
    }


    if (email.trim() === "") {   // email
        document.getElementById("emailError").innerText = "Không được để trống";
        return;
    } else if (!validateEmail(email)) {  //validateEmail kiem tra tinh hop le cua mot dia chi email
        document.getElementById("emailError").innerText = "Không đúng định dạng email";
        return;
    } else {
        document.getElementById("emailError").innerText = "";
    }


    if (password.trim() === "") {  //password
        document.getElementById("passError").innerText = "Không được để trống";
        return;
    } else if (!validatePassword(password)) {
        document.getElementById("passError").innerText = "Mật khẩu phải ít nhất 6 kí tự bao gồm 1 chữ số, 1 kí tự đặc biệt";
        return;
    } else {
        document.getElementById("passError").innerText = "";
    }


    if (password !== passwordConfirm) {  // kiểm tra xác nhận mật khẩu
        document.getElementById("passConfirmError").innerText = "Mật khẩu không trùng khớp";
        return;
    }

    // thực hiện đăng kí : tạo đối tượng user
    let newUser = {
        id: getNewId(),
        name: username,
        email: email,
        full_name: fullName,
        honame: password,
        phanloai: "khach hang",
        avatar: "avatar.jpg",
        time: "06:59",
        datetime: "2023-08-15T06:59",
        cart: []
    }
    users = [...users, newUser];  // chuyển trang tự động
    localStorage.setItem("users", JSON.stringify(users));


    // them gio hang
    const carts = JSON.parse(localStorage.getItem("carts"))
    carts.push({
        id: newUser.id,
        cart: []
    })
    localStorage.setItem("carts", JSON.stringify(carts))


    location.href = "../loginpage/login.html";
}


// hàm validate email
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}


// hàm validate pass 
const validatePassword = (pass) => {
    return String(pass)
        .toLowerCase()
        .match(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/);
}


// hàm tự tăng id
const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (u.id > idMax) {
            idMax = u.id;
        }
    }
    return idMax + 1;
}

