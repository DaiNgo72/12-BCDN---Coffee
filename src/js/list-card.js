import { createElement } from "./index.js"

export const ListCard = () => {

    const listCard = createElement('div', { className: 'list-card' });

    // Cơ chế: bất đồng bộ
    console.log(1);
    fetch('https://673b3ae4339a4ce4451b3e27.mockapi.io/product')
        .then(r => r.json())
        .then((r) => {
            console.log(2);
            // console.log(r);
            r.forEach((i) => {
                // console.log({ i })
                listCard.append(
                    Card({
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

    return createElement(
        'div',
        { className: 'card' },

        createElement('div', { className: 'card-header' },
            createElement('img', {
                src: props.img,
                width: "200",
                height: "200"
            })
        ),

        createElement('div', { className: 'card-content' },
            createElement('h2', {}, props.title),
            createElement('p', {}, props.desc)
        ),

        createElement('div', { className: 'card-footer' },
            createElement('p', {}, `${props.price}$`),
            createElement('button', {}, 'Add Cart')
        ),

    )
}