class UsersController < ApplicationController

    def create
        @user = User.create user_params
        if @user.save
            render :show
        else 
            render json: @user.errors.messages, status: 422
        end
    end

    def show
        @user = User.find_by(id: params[:id])
        if @user 
            render :show
        else
            render json: {general: ['no such user']}, status: 404
        end
    end

    def user_params
        params.permit(:user).require(:email, :password)
    end
end
