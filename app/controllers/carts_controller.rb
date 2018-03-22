class CartsController < ApplicationController
    before_action :ensure_cart

    def ensure_cart
        @session = Session.find_by(token: session[:session_token]).inlcudes(cart: :order_items)
        if !@session
            @session = create_session
            @cart = @session.cart
        end
    end

    def fetch_order_item
        @order_item = @cart.order_items.where(id: @action[:order_item_id])
    end

    def show
        render :show
    end

    def update
        @action = params[:action]
        type = action[:type]
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
            @order_item = OrderItem.new product_id: @action[:product_id],
                quantity: @action[:quantity],
                order_id: @action[:order_id]
            if @order_item.save
                render json: 'success'
            else
                render json: @order_item.errors.messages, status: 422
            end 
        end
    end
end