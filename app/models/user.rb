class User < ApplicationRecord
    attr_accessor :password
    validates :email, :first_name, :last_name, :password, :password_digest, :is_admin,
        presence: true
    has_many :addresses, class_name: "address", foreign_key: "user_id"
    def password=(new_password)
        @password = new_password
        self.password_digest = BCrypt::Password.create(new_password)
    end

    def is_password?(pass)
        BCrypt::Password.new(self.password_digest).is_password? pass 
    end

    def logout
        self.session_token = nil
    end

    def login
        new_session_token = SecureRandom.urlsafe_base64
        loop do
            session[:session_token] = new_session_token
            self.session_token = new_session_token
            break if save
        end
    end

end
