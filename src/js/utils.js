export const saveToLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// saveToLocal('order', {
//     id: 1,
//     name: 'coffee 1'
// })

export const getLocal = (key) => {
    const value = localStorage.getItem(key);

    return JSON.parse(value);
}

// getLocal('order')
