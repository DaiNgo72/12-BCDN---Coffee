/**
 * factory
 */
export function el(tag, props, ...children) {
    const el = document.createElement(tag);

    // for in: duyệt qua từng key của object
    for (const key in props) {
        const value = props[key];

        // Thêm vào thuộc tính được cho thẻ
        // Nhưng có thể sẽ không hiển thị được lên trên trình duyệt

        // Nếu như thuộc tính của mình là thuộc tính mặc định của trình duyệt
        if(key in el) {
            el[key] = value;
        } else {
            // Những thuộc tính không phải mặc định của trình duyệt, nhưng muốn hiển thị lên trên cây DOM của trình duyệt.
            el.setAttribute(key, value);
        }
    }

    // if (children && Array.isArray(children)) {
    // children= undefined
    children.forEach(
        function (child) {
            // if(typeof child === 'string') {
            //     child = document.createTextNode('child');
            // }

            el.append(child);
        }
    )
    // }


    return el;
}

// ES6
// rest parameter: nhận những phần còn lại của đối số người dùng truyền vào
export function sum(...rest) {
    let sum = 0;
    rest.forEach(n => {
        sum += n
    })

    return sum
}
// , 12, 3, 123, 12, 312, 3, 12, 312, 3
// console.log(sum(1, 2, 3, 4, 6, 7))

const PI = 3.14

export const CART_KEY = "cart-key"