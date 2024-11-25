import { el } from './index.js'

export const Header = () => {
    return el(
        'header',
        {},
        el('div', { className: 'container' },

            el('div', { className: 'header__wrapper' },

                el('a', {
                    href: '/'
                },
                    el('i', { className: "fa-solid fa-mug-saucer" })
                ),

                el('h1', {}, "Coffee Masters"),

                el(
                    'a',
                    {
                        href: "src/pages/order.html"
                    },
                    el('i', { className: 'fa-solid fa-cart-shopping' })
                ),

            )
        )
    )
}