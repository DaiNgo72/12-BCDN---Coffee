const root = document.getElementById('root');

const orderEle = document.createElement('a')
orderEle.textContent = 'Order'
orderEle.href = "./src/pages/order.html"

const adminEle = document.createElement('a')
adminEle.textContent = 'admin'
adminEle.href = "./src/pages/admin.html"
adminEle.target = '_blank'

const h1Ele = document.createElement('h1')
h1Ele.textContent = "Coffee"


root.append(orderEle)
root.append(adminEle)
root.append(h1Ele)

/**
 * factory
 */
function createElement(tag, props, children) {
    const el = document.createElement(tag);

    // for in: duyệt qua từng key của object
    for (const key in props) {
        const value = props[key];

        el[key] = value;
    }

    if (children && Array.isArray(children)) {
        // children= undefined
        children.forEach(
            function (child) {
                el.append(child);
            }
        )
    }


    return el;
}

const aEle = createElement('a', {
    href: './src/pages/order.html',
    target: '_blank',
    style: "color: blue",
    className: 'abc',
    textContent: "TEST A"
})

root.append(aEle);

const divEle = createElement('div',
    {},
    [
        createElement('p', { textContent: 'lorem1' }),
        createElement('p', { textContent: 'lorem2' })
    ]
)

root.append(divEle);

root.append(

    createElement('img', {
        src: 'https://picsum.photos/id/237/200/300',
        alt: 'hinh anh'
    })

)

root.append(

    createElement('button', {
        onclick: () => {
            console.log('hahahah')
        },
        textContent: 'click me'
    })

)

// const coffee1 = {
//     "name": "name 1",
//     "price": 9,
//     "image": "image 1",
//     "type": "type 1",
//     "desc": "desc 1",
//     "id": "1"
// }

// coffee1['name']
// coffee1['price']
// coffee1['image']

// // Log ra key: value của obj coffee1
// for (const prop in coffee1) {
//     console.log(prop); // name, price

//     console.log(coffee1[prop]) // coffee1['name'] coffee1['price']
// }