import { Header } from '../header.js'
import { el, CART_KEY } from '../index.js'
import { getLocal } from '../utils.js'

const root = document.getElementById('root')

root.append(
    Header(),
    ListCart(),
)

function ListCart() {

    const tbody = el('tbody', {});

    fetch("https://673b3ae4339a4ce4451b3e27.mockapi.io/product")
        .then(r => r.json())
        .then(r => {
            console.log(r);
            const value = getLocal(CART_KEY);
            // Cách 1:
            // const arrListCart = [];
            // r.forEach(item => {
            //     // Nếu như item.id có nằm trong mảng của cart
            //     // Thêm vào arrListCart
            //     if (value.includes(item.id)) {
            //         arrListCart.push(item);
            //     }
            // })

            // Cách 2: filter
            const arrListCart2 = r.filter(item => {
                // true thì item sẽ được thêm vào mảng arrListCart2
                // false thì sẽ bỏ qua, không thêm vào mảng

                // exist: object | undefined
                const exist = value.find((cart) => {
                    return cart.id === item.id
                })

                // Nếu tìm thấy thì return true.
                if (exist) {
                    return true;
                } else {
                    return false;
                }

            })

            arrListCart2.forEach(cart => {
                // Tìm vị trí index của sản phẩm trong giỏ hàng tương ứng với sản phẩm của call api
                const idx = value.findIndex(c => {
                    return c.id === cart.id;
                })

                // thêm thuộc tính quantity cho sản phẩn của call api
                // với quantity từ giỏ hàng
                cart.quantity = value[idx].quantity
            })

            // const arrListCart3 = filter(r, item => {
            //     // true thì item sẽ được thêm vào mảng arrListCart2
            //     // false thì sẽ bỏ qua, không thêm vào mảng
            //     return value.includes(item.id);
            // })

            console.log(arrListCart2);

            let total = 0;

            arrListCart2.forEach(item => {

                tbody.append(
                    Tr(item)
                )

                total += item.price * item.quantity;

            })

            // -----------
            tbody.append(
                TrTotal(total)
            )

        })
        .catch(err => {
            console.log(err);
        })

    return el('table', {},
        el('thead', {},
            el('tr', {},
                el('th', {}, "Title"),
                el('th', {}, "Quantity"),
                el('th', {}, "Price"),
                el('th', {}, "Total"),
            )
        ),

        tbody

    )
}

function Tr(props) {
    return el('tr', {},
        el('td', {}, props.name),
        el('td', {},
            el('button', {
                onclick: () => {
                    console.log('+')
                }
            }, "+"),

            el('span', {}, props.quantity),

            el('button', {
                onclick: () => {
                    console.log('-')
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

// function filter(arr, cb) {
//     const arrListCart = [];

//     arr.forEach(item => {
//         console.log(arr,item)
//         if (cb(item)) {
//             arrListCart.push(item);
//         }
//     })

//     return arrListCart;
// }