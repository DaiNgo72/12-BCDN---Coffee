import { el, BASE_URL } from "../index.js";


const btnAdd = document.getElementById('btn-add');
let isUpdate = false;
let idUpdate = null;

function getListProduct() {
    fetch('https://673b3ae4339a4ce4451b3e27.mockapi.io/product')
        .then(r => r.json())
        .then(r => {
            renderListProduct(r);
        })
}

getListProduct();

// Sau khi có dữ liệu list product thì gọi function này
function renderListProduct(arr) {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.textContent = '';

    arr.forEach(item => {
        tbody.append(
            Tr(item)
        )
    });
}

function Tr(props) {
    return el('tr', {},
        el('td', {}, props.name),
        el('td', {}, props.desc),
        el('td', {}, `${props.price}$`),
        el('td', {},
            el('img', {
                src: props.image,
                width: 100,
                height: 100,
            })
        ),
        el('td', {},
            el('button', {
                onclick: () => {
                    // Update lại form
                    document.getElementById('inp-name').value = props.name;
                    document.getElementById('inp-desc').value = props.desc;
                    document.getElementById('inp-price').value = props.price;
                    document.getElementById('inp-img').value = props.image;

                    btnAdd.textContent = "Update";

                    // Cập nhật cờ edit
                    isUpdate = true;
                    idUpdate = props.id;
                }

            }, 'Edit'),
            el('button', {

                onclick: () => {
                    fetch(`${BASE_URL}/product/${props.id}`, {
                        method: 'DELETE',
                    }).then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        // handle error
                    }).then(task => {
                        // Do something with deleted task
                        // Sau khi delete thành công thì gọi lại show listProduct mới
                        getListProduct();
                    }).catch(error => {
                        // handle error
                    })

                }

            }, 'Delete')
        ),
    )
}

// ----------------
document.getElementById('btn-add').onclick = () => {
    if (isUpdate) {
        const name = document.getElementById('inp-name').value;
        const desc = document.getElementById('inp-desc').value;
        const price = document.getElementById('inp-price').value;
        const img = document.getElementById('inp-img').value;

        const postUpdate = {
            name: name,
            desc: desc,
            price: price,
            image: img,
        }

        fetch(`${BASE_URL}/product/${idUpdate}`, {
            method: 'PUT', // or PATCH
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(postUpdate)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // Do something with updated task

            // Update thành thì render lại table
            getListProduct();

            btnAdd.textContent = "Add";
            isUpdate = false;
            idUpdate = null;

            resetForm();
        }).catch(error => {
            // handle error
        })
    }
    else {
        const name = document.getElementById('inp-name').value;
        const desc = document.getElementById('inp-desc').value;
        const price = document.getElementById('inp-price').value;
        const img = document.getElementById('inp-img').value;
        // 

        console.log(name, desc, price, img);

        const newProduct = {
            name: name,
            desc: desc,
            price: price,
            image: img,
        }

        fetch('https://673b3ae4339a4ce4451b3e27.mockapi.io/product', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // Send your data in the request body as JSON
            body: JSON.stringify(newProduct)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // do something with the new task

            // Sau khi thêm sản phẩm thành công thì gọi lại listProduct và render lại giao diện
            getListProduct();


            resetForm();

        }).catch(error => {
            // handle error
        })
    }


}

function resetForm() {
    document.getElementById('inp-name').value = ''
    document.getElementById('inp-desc').value = ''
    document.getElementById('inp-price').value = ''
    document.getElementById('inp-img').value = ''
}