json.extract! product, :id, :title, :image_url,
    :category, :unit_price
json.set! :image_url, product_image_url(product)