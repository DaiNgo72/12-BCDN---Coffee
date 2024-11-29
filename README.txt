# public: 
- logo
- font chữ

# src:
- Nơi code chính của chúng ta


# window
- là đối tượng global chứa cả html + js
- giúp chúng ta có thể tương tác qua lại giữa html và js

- khi sử dụng js với type là module thì đoạn code của mình sẽ được đóng gói lại và không chia sẻ tự động lên cho window. Nếu muốn chia sẻ thì phải viết thủ công

# Order
- Kiểu dữ liệu gì để lưu trữ những sản phẩm mà người dùng thêm vào giỏ hàng?

const listCart = [
 {
    img: i.image,
    title: i.name,
    desc: i.desc,
    price: i.price
 },

]

const listCart = [
    id
]

# Truthy, falsy
- Truthy: còn lại.
- Falsy: null, undefined, false, 0, ""

# Promise
# Array, Object: Address, Tham chiếu