class ProductsController < ApplicationController
    before_action :require_admin, except: [:index, :show]
    def index
        @products = Product.all
        render :index
    end

    def show
        @product = Product.find_by(id: params[:id])
        if @product
            render :show
        else
            render json: {general: 'no such product'}, status: 404
        end
    end

    def create
        @product = Product.new product_params
        if @product
            render :show
        else
            render json: @product.errors.messages, status: 422
        end
    end

    def destroy
        @product = Product.find(params[:id])
        if @product 
            @product.destroy
            render json: 'success'
        else
            render json: {general: 'no such product'}, status: 404
        end
    end

    def product_params
        params.require(:product).permit :title, :category,
         :unit_price, :description, :image_url
    end

    def require_admin
        @user = Session.find_by(token: session[:session_token])
        render json: {general: 'not and admin'}, status: 403 unless @user && @user.is_admin? 
    end
end
