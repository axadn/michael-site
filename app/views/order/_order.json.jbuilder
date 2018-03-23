json.array! order_items do |order_item|
    json.partial! 'order/order_item', order_item: order_item
    json.title order_item.product.title
end