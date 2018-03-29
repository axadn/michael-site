class ProductsController < ApplicationController
    before_action :require_admin, except: [:index, :show]
    helper_method :product_image_url
    def index
        if params["query"] && params["query"].length > 0
            @products = Product.search_by_title(params["query"])
        else
            @products = Product.order('title ASC').all
        end

        if params["categories"] && params["categories"].length > 0
            @products = @products.where('category in (?)', params["categories"].split(' '))
        end
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
        @product.active = false
        if @product.save
            render json: presigned_img_fields(params[:image_extension])
        else
            render json: @product.errors.full_messages, status: 422
        end
    end

    def update
        @product = Product.find_by(id: params[:id])
        if @product
            @product.attribs = product_params
            if @product.save
                render :show
            else
                render json: @product.errors.messages, status: 422
            end
        else
            render json: {general: "no such product"}, status: 404
        end
    end

    def batch_update
        type = params[:type]
        @products = Product.where('id in (?)', params[:ids])
        case type
        when 'SET_ACTIVE'
            @products.update_all(active: true)
            render_success
        when 'SET_INACTIVE'
            @products.update_all(active: false)
            render_success
        when 'DELETE'
            @products.destroy_all
            render_success
        else
            render json: {general: 'unrecognized action'}, status: 422
        end
    end

    def render_success
        render json: {sucess: true}
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
         :unit_price, :description, :image_url, :active
    end

    def require_admin
        @user = Session.find_by(token: session[:session_token]).user
        render json: {general: 'not and admin'}, status: 403 unless @user && @user.is_admin? 
    end

    def presigned_img_fields(image_extension)
        obj = s3_bucket.object s3_image_path(@product)
        post = obj.presigned_post(key: s3_image_path(@product))
        post.fields
    end

    def s3_image_path(product)
        "products/#{product.id}/images/0"
    end

    def s3_bucket
        @s3_bucket ||=(
          aws_client = Aws::S3::Client.new(region: 'us-west-1',
          access_key_id: ENV["S3_ID"],
          secret_access_key: ENV["S3_KEY"])
    
          s3 = Aws::S3::Resource.new(client: aws_client)
          s3.bucket(ENV["S3_BUCKET"])
          )
      end

    def product_image_url(product)
        s3_bucket.object(s3_image_path(product)).presigned_url :get
    end
end
