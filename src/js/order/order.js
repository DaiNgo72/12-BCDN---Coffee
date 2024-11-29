import { Header } from '../header.js'
import { el, CART_KEY } from '../index.js'
import { getLocal, saveToLocal } from '../utils.js'


const root = document.getElementById('root')
const cartLocal = getLocal(CART_KEY);

root.append(
    Header(),
    ListCart(),
)



let listCartValue = []

function getCartAPI() {
    fetch("https://673b3ae4339a4ce4451b3e27.mockapi.io/product")
        .then(r => r.json())
        // 1. Lấy sản phẩm mà người dùng đã thêm vào giỏ hàng
        .then(r => {
            // Cách 2: filter
            // 1. Lấy sản phẩm mà người dùng đã thêm vào giỏ hàng
            const arrListCart2 = r.filter(item => {
                // true thì item sẽ được thêm vào mảng arrListCart2
                // false thì sẽ bỏ qua, không thêm vào mảng

                // exist: object | undefined
                const exist = cartLocal.find((cart) => {
                    return cart.id === item.id
                })

                // Nếu tìm thấy thì return true.
                if (exist) {
                    return true;
                } else {
                    return false;
                }
            })


            // Lưu lại để có tăng giảm số lượng của một sản phẩm thì không cần gọi api
            listCartValue = arrListCart2;

            return arrListCart2;
        })
        // 2. Lặp qua từng sản phẩm và bổ sung property số lượng vào cho từng sản phẩm đó.
        .then(arrListCart2 => {
            arrListCart2.forEach(cart => {
                const idx = cartLocal.findIndex(c => {
                    return c.id === cart.id;
                })
                cart.quantity = cartLocal[idx].quantity
            })

            return arrListCart2
        })
        // 3. Tính total + Render ra Tr
        .then(arrListCart2 => {
            const tbody = document.getElementById('tbody');
            tbody.textContent = '';

            // 3.
            let total = 0;
            // 3. Tính total + Render ra Tr
            arrListCart2.forEach(item => {

                tbody.append(
                    Tr(item)
                )

                total += item.price * item.quantity;

            })

            // -----------
            // 4. Render thẻ TrTotal
            tbody.append(
                TrTotal(total)
            )
        })
        .catch(err => {
            console.log(err);
        })
}

getCartAPI();

function render() {
    // 1. Bổ sung quantity cho từng phần tử của mảng cần render
    listCartValue.forEach(cart => {
        const idx = cartLocal.findIndex(c => {
            return c.id === cart.id;
        })

        cart.quantity = cartLocal[idx].quantity
    })

    // 2. Render UI
    const tbody = document.getElementById('tbody');
    tbody.textContent = '';

    let total = 0;
    // Lặp qua từng phần tử của mảng và show lên giao diện.
    listCartValue.forEach(item => {
        tbody.append(
            Tr(item)
        )

        total += item.price * item.quantity;
    })

    tbody.append(
        TrTotal(total)
    )
}

function ListCart() {
    // Nếu local không có giỏ hàng thì return Null
    if (!cartLocal) {
        return el('p', {}, "Empty");
    }

    return el('table', {},
        el('thead', {},
            el('tr', {},
                el('th', {}, "Title"),
                el('th', {}, "Quantity"),
                el('th', {}, "Price"),
                el('th', {}, "Total"),
            )
        ),

        el('tbody', { id: 'tbody' }, "loading...")
    )
}

function Tr(props) {
    return el('tr', {},
        el('td', {}, props.name),
        el('td', {},
            el('button', {
                onclick: () => {
                    console.log('+');

                    const idx = cartLocal.findIndex(
                        item => {
                            return item.id === props.id
                        }
                    )

                    cartLocal[idx].quantity += 1;

                    saveToLocal(CART_KEY, cartLocal);

                    // Render lại giao diện
                    render();
                }
            }, "+"),

            el('span', {}, props.quantity),

            el('button', {
                onclick: () => {
                    console.log('-')

                    const idx = cartLocal.findIndex(
                        item => {
                            return item.id === props.id
                        }
                    )

                    if(cartLocal[idx].quantity === 1) {
                        return;
                    }
                    
                    cartLocal[idx].quantity -= 1;

                    saveToLocal(CART_KEY, cartLocal);

                    // Render lại giao diện
                    render();
                }
            }, "-")
        ),

        el('td', {}, `${props.price}$`),

        el('td', {}, `${props.price * props.quantity}$`),
    )
}

function TrTotal(total) {
    return el('tr', {},
        el('td', { colSpan: '3', abc: 20, "data-cart-id": 12 }, "Total:"),
        el('td', {}, `${total}$`)
    )
}



