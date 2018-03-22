class SessionController < ApplicationController
    def create
        @user = User.find_by_credentials login_params
        if @user
            @user.login
        else
            render json: {general: "invalid username or password"}, status: 422
        end
    end

    def destroy
        @session = Session.find_by(token: session[:session_token])
        if @session
            @session.destroy
        else
            render json: {general: "not logged in"}, status: 403
        end
    end

    def login_params
        params.permit(:email, :password)
    end
end
