function drawTable() {
    let products = JSON.parse(localStorage.getItem("product")) || [];
    const userLogin = JSON.parse(localStorage.getItem("userlogin"));

    let stringHTML = "";
    let total = 0;

    userLogin.cart.forEach(element => {
        const product = products.find(e => e.id == element.idProduct);
        total += product.sum * element.quantity;
        stringHTML +=
            `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.sum}$</td>
            <td>${element.quantity}</td>
            <td>${product.sum * element.quantity}$</td>
            <td>
            <button style="color:blue" onclick="beforeEdit(${element.idProduct})"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
            <button style="color:red" onclick="onDelete(${element.idProduct})"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
    `;
    });
    document.getElementById("table_body").innerHTML = stringHTML;
    document.getElementById("total_all").innerHTML = total;
}
drawTable();

let indexUpdateGlobal = null;
function onDelete(id) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        const userLogin = JSON.parse(localStorage.getItem("userlogin"));
        const indexDelete = userLogin.cart.findIndex(e => e.idProduct == id);
        userLogin.cart.splice(indexDelete, 1);

        localStorage.setItem("userlogin", JSON.stringify(userLogin));
        drawTable();
    }
}

function beforeEdit(id) {
    document.getElementById('question').style.display = 'block';

    const userLogin = JSON.parse(localStorage.getItem("userlogin"));
    const indexEdit = userLogin.cart.findIndex(e => e.idProduct == id);
    indexUpdateGlobal = indexEdit;

    document.getElementById('editCount').value = userLogin.cart[indexEdit].quantity;
}

function onUpdate() {
    const userLogin = JSON.parse(localStorage.getItem("userlogin"));

    userLogin.cart[indexUpdateGlobal].quantity = Number(document.getElementById("editCount").value);
    localStorage.setItem("userlogin", JSON.stringify(userLogin));
    indexUpdateGlobal = null;
    onCancel();
    drawTable();
}

function onCancel() {
    document.getElementById('question').style.display = "none";
}


function CheckOut() {
    const carts = JSON.parse(localStorage.getItem("carts")) || [];
    const userLogin = JSON.parse(localStorage.getItem("userlogin"));
    carts.push({
        id: Math.floor(1000 + Math.random() * 8999),
        userId: userLogin.id,
        note: document.getElementById("note").value,
        cart: userLogin.cart,
        status: "Đang chờ xử lý",
        createAt: new Date(),
    });
    userLogin.cart = [];

    localStorage.setItem("carts", JSON.stringify(carts));
    // localStorage.setItem("userlogin", JSON.stringify(userLogin));
    alert("Đơn hàng đã được đặt");
    // location.reload();
    // drawTable();
    // document.getElementById("note").value = "";
    location.href = "../user/userindex.html";
}


// //////////////
// let orders = JSON.parse(localStorage.getItem("order")) || []

// const handleCheckOut = () => {
//     let id = getNewId
//     let name = userLogin.id
//     // let time1 = new Date().toLocaleString()
//     let note = [];
//     let sum = 0
//     for (let i = 0; i < userLogin.cart.length; i++) {
//         const element = userLogin.cart[i];
//         let product = product.find(pro => pro.id == element.idProduct)
//         //tính tổng tiền
//         sum += product.sum * element.quantity;
//         // mỗi spp trong giỏ hàng sẽ là 1 chi tiết hoa đơn tỏng hóa đơn
//         let order_detail = {
//             id: element.idProduct,
//             name: product.name,
//             sum: product.sum,
//             quantity: element.quantity
//         }
//         note.push(order_detail);
//     }


//     let order_at = new Date().toLocaleString();
//     let status = 1;
//     let noteNote = document.getElementById("note").value;

//     // tạo hóa đơn mới
//     let newOrder = {
//         order_id,
//         user_id,
//         order_at,
//         total_price,
//         status,
//         noteNote,
//         orders_details
//     }

//     console.log(newOrder);
//     orders.push(newOrder);
//     // lưu vào local
//     localStorage.setItem("orders", JSON.stringify(orders));
//     // reset giỏ hàng
//     userLogin.cart = [];
//     sessionStorage.setItem("userlogin", JSON.stringify(userLogin));

//     // trước khi đăng xuất thì lưu giỏ hàng vào local
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // tìm vị trí của userlogin
//     let userLoginIndex = users.findIndex((user) => user.user_id == userLogin.user_id);

//     users[userLoginIndex] = userLogin;
//     // Lưu lại vào localStorage
//     localStorage.setItem("users", JSON.stringify(users))
//     alert("Đơn hàng đã được đặt")
//     location.reload();
// }



// const getNewId = () => {
//     let idMax = 0
//     for (let i = 0; i < orders.length; i++) {
//         const element = orders[i];
//         if (idMax < element.id) {
//             idMax = element.id
//         }
//     }
//     return idMax + 1;
// }



// function checkSearch() {
//     let text = document.getElementById("search").value;
//     let products = JSON.parse(localStorage.getItem("product")) || [];
//     let checkProduct = products.filter(stud => stud.Name.toLowerCase().includes(text.trim().toLowerCase()));
//     drawTable(checkProduct);
// }
// document.getElementById("search").addEventListener("keydown", (e) => {
//     if (e.keyCode == 13) {
//         checkSearch();
//     }
// });

// function alphab() {
//     let products = JSON.parse(localStorage.getItem("product")) || [];
//     products.sort((a, b) => a.name.localeCompare(b.name));
//     localStorage.setItem("product", JSON.stringify(products));
//     drawTable();
//     location.reload();
// }