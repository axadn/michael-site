class User < ApplicationRecord
    attr_accessor :password
    validates :email, :first_name, :last_name, :password_digest,
        presence: true
    validates :email, uniqueness: true
    has_many :orders, dependent: :destroy
    has_many :addresses, dependent: :destroy
    has_one :session, dependent: :destroy
    def password=(new_password)
        @password = new_password
        self.password_digest = BCrypt::Password.create(new_password)
    end

    def is_password?(pass)
        BCrypt::Password.new(self.password_digest).is_password? pass 
    end

    def logged_in?
        !self.session.nil?
    end

    def self.find_by_credentials(opts)
        user = User.find_by(email: opts[:email])
        return user if user && user.is_password?(opts[:password])
        nil
    end

end
