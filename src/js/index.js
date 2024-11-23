/**
 * factory
 */
export function createElement(tag, props, ...children) {
    const el = document.createElement(tag);

    // for in: duyệt qua từng key của object
    for (const key in props) {
        const value = props[key];

        el[key] = value;
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
