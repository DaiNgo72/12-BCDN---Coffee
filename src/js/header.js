import { createElement } from './index.js'

export const Header = () => {
    return createElement(
        'header',
        {},
        createElement('div', { className: 'container' },

            createElement('div', { className: 'header__wrapper' },

                createElement('div', {},
                    createElement('i', { className: "fa-solid fa-mug-saucer" })
                ),

                createElement('h1', {}, "Coffee Masters"),

                createElement(
                    'a',
                    {
                        href: "src/pages/order.html"
                    },
                    createElement('i', { className: 'fa-solid fa-cart-shopping' })
                ),

            )
        )
    )
}