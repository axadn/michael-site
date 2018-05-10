class CartsController < ApplicationController
    before_action :ensure_cart
    def ensure_cart
        @cart = Order.joins("INNER JOIN sessions ON sessions.cart_id = orders.id")
            .where("sessions.token = ?", session[:session_token]).first
        if !@cart
            @cart = create_session(nil, Order.create(status: "cart")).cart
        end
        @order_items = OrderItem.includes(:product).order("products.title ASC, order_items.id ASC")
    end

    def fetch_order_item
        @order_item = @order_items.find_by(id: @action[:order_item_id])
        render json: {general: 'item not found'}, status: 404 if @order_item.nil?
        @order_item
    end

    def show
        render :show
    end

    def update
        @action = params[:cart]
        type = @action[:type]
        case type
        when 'UPDATE_QUANTITY'
            if fetch_order_item
                @order_item.quantity = @action[:quantity]
                if @order_item.save
                    render :show
                else
                    render json: @order_item.errors.messages, status: 422
                end
            end
        when 'DELETE_ITEM'
            if fetch_order_item
                @order_items.delete(@order_item)
                render :show
            end
        when 'ADD_ITEM'
            ## if this item is already in the cart we will just update the quantity
            product = Product.find_by(id: @action[:product_id])
            if product
                @order_item = OrderItem.new product_id: @action[:product_id],
                quantity: @action[:quantity],
                order_id: @cart.id,
                unit_price: product.unit_price
                if @order_item.save
                    render plain: "success"
                else
                    render json: @order_item.errors.messages, status: 422
                end 
            else
                render json: {general: 'product not found'}, status: 404
            end
        when 'CLEAR_CART'
            @cart.order_items.delete_all unless @cart.order_items.nil?
            render :show
        end
    end

    def order
        ### We are doing it this way to ensure it is atomic.
        ### This method also requires that we don't insert
        ### duplicate rows violating the uniqueness constraint,
        ### so there can't be duplicate cart items.
        ActiveRecord::Base.connection.execute( 
            <<-SQL
                INSERT INTO sale_records (title, date, count)
                    SELECT products.title, current_date, order_items.quantity
                    FROM products
                    JOIN order_items 
                    ON products.id = order_items.product_id
                    WHERE order_items.order_id = #{@cart.id}
                ON CONFLICT(date, title) DO 
                    UPDATE SET count = sale_records.count + excluded.count
                ;
            SQL
        )
        @cart.order_items.delete_all unless @cart.order_items.nil?
    end
end