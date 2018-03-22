class SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials login_params
        if @user
            login(@user)
            render json: "success"
        else
            render json: {general: "invalid username or password"}, status: 422
        end
    end

    def destroy
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
