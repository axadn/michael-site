cart.each do |order_item|
    json.set! order_item.id do
        json.partial! 'order/order_item' order_item
    end
end