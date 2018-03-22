class User < ApplicationRecord
    attr_accessor :password
    validates :email, :first_name, :last_name, :password, :password_digest, :is_admin,
        presence: true, uniqueness: true
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

    def logout
        self.session.destroy
    end

    def logged_in?
        !self.session_id.nil?
    end

    def login
        logout if logged_in?
        loop do
            new_session = Session.new token: SecureRandom.urlsafe_base64,
                user: self
            break if new_session.save
        end
    end

    def self.find_by_credentials(opts)
        user = User.find_by(email: opts[:email])
        return user if user && user.is_password?(opts[:password])
        nil
    end

end
