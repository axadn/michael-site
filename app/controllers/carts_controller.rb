class CartsController < ApplicationController
    before_action :ensure_cart

    def ensure_cart
        @session = Session.includes(cart: {order_items: :product}).find_by(token: session[:session_token])
        if !@session
            @session = create_session
        end
        @cart = @session.cart
    end

    def fetch_order_item
        @order_item = @cart.order_items.where(id: @action[:order_item_id])
    end

    def show
        render :show
    end

    def update
        @action = params[:cart][:action]
        type = @action[:type]
        case type
        when 'UPDATE_QUANTITY'
            fetch_order_item
            @order_item.quantity = action[:quantity]
            if @order_item.save
                fetch_cart
                render :show
            else
                render json: @order_item.errors.messages, status: 422
            end
        when 'DELETE_ITEM'
            fetch_order_item
            if @order_item
                @order_item.destroy
                fetch_cart
                render :show
            else
                render json: {general: 'item not found'}, status: 404
            end
        when 'ADD_ITEM'
            product = Product.find_by(id: @action[:product_id])
            if product
                @order_item = OrderItem.new product_id: @action[:product_id],
                quantity: @action[:quantity],
                order_id: @action[:order_id],
                unit_price: product.unit_price
                if @order_item.save
                    render json: 'success'
                else
                    render json: @order_item.errors.messages, status: 422
                end 
            else
                render json: {general: 'product not found'}, status: 404
            end
        end
    end
end