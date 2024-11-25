import { el, CART_KEY } from "./index.js"
import { getLocal, saveToLocal } from './utils.js'

export const ListCard = () => {

    const listCard = el('div', { className: 'list-card' }, 'loading...');

    // Cơ chế: bất đồng bộ
    console.log(1);
    fetch('https://673b3ae4339a4ce4451b3e27.mockapi.io/product')
        .then(r => r.json())
        .then((r) => {
            console.log(2);
            // console.log(r);

            // Call api thành công thì xóa nội dung loading...
            listCard.textContent = '';

            r.forEach((i) => {
                console.log({ i })
                listCard.append(
                    Card({
                        id: i.id,
                        img: i.image,
                        title: i.name,
                        desc: i.desc,
                        price: i.price
                    }),
                )
            })
        })
        .catch(err => {
            console.log(err);
        })

    console.log(3);
    return listCard;
}


const Card = (props) => {

    return el(
        'div',
        { className: 'card' },

        el('div', { className: 'card-header' },
            el('img', {
                src: props.img,
                width: "200",
                height: "200"
            })
        ),

        el('div', { className: 'card-content' },
            el('h2', {}, props.title),
            el('p', {}, props.desc)
        ),

        el('div', { className: 'card-footer' },
            el('p', {}, `${props.price}$`),
            el('button', {
                onclick: () => {
                    console.log("hihi", props.title)

                    // Thêm id của cart vào localStrorage
                    addToCart(props.id)
                }
            }, 'Add Cart')
        ),
    )
}


function addToCart(id) {
    console.log(id);

    const value = getLocal(CART_KEY);

    // 1. Kiểm tra xem đã có sản phẩm nào trong giỏ hàng hay chưa
    // !Boolean(value) => chỉ cần chúng ta ghi dấu ! thì js tự động ép về kiểu Boolean
    if (!value) {
        saveToLocal(CART_KEY, [{ id: id, quantity: 1 }]);
    } else {

        // Tìm index để xem thử có tồn tại trong giỏ hàng hay chưa
        const idx = value.findIndex((item) => {
            return item.id === id
        });

        // Có tồn tại
        if (idx >= 0) {
            const findItem = value[idx];

            // Từ vị trí đó, xóa đi 1 phần từ, và thêm vào 1 phần từ ở vị trí đó
            // replace
            value.splice(idx, 1, {
                id: findItem.id,
                quantity: findItem.quantity + 1
            })

            // Không tồn tại thì thêm mới vào
        } else {
            value.push({
                id: id,
                quantity: 1
            })
        }

        // 2. Lưu vào localStrorage
        saveToLocal(CART_KEY, value);
    }



}

