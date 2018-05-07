class SessionsController < ApplicationController
    def create
        debugger
        @user = User.find_by_credentials login_params
        if @user
            if session.key? :session_token
                old_session = Session.find_by(token: session[:session_token])
                @cart = old_session.cart
            end

            if @cart && @cart.order_items.length > 0
                login(@user, @cart)
            else
                login(@user)
            end

            render json: "success"
        else
            render json: {general: "invalid username or password"}, status: 422
        end
    end

    def destroy
        byebug
        @session = (session.key? :session_token) ? Session.find_by(
            token: session[:session_token]) : nil
        if @session
            logout(@session)
            render json: "success"
        else
            render json: {general: "not logged in"}, status: 403
        end
    end

    def login_params
        params.permit(:email, :password)
    end
end
