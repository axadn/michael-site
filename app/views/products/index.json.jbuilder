@products.each do |product|
    json.set! product.id do
        json.partial! "products/product", product: product
    end
end