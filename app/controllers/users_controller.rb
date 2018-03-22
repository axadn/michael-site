class UsersController < ApplicationController

    def create
        @user = User.create user_params
        if @user.save
            login(@user)
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
        params.permit(:email, :password, :first_name, :last_name)
    end
end
