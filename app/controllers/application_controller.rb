class ApplicationController < ActionController::Base
  ##protect_from_forgery with: :exception
  def login(user, cart = nil)

    if user.logged_in?
      cart = cart || user.session.cart
      logout(user.session)
    end

    if cart.nil?
      create_session(user, Order.create(status: "cart"))
    else
      create_session(user, cart)
    end

  end

  def create_session(user, cart)
    new_session = nil
    loop do
      new_session = Session.new token: SecureRandom.urlsafe_base64,
          user: user, cart: cart
      break if new_session.save
    end
    session[:session_token] = new_session.token
    new_session
  end

  def logout(sessionRecord)
    sessionRecord.destroy
    session[:session_token] = nil
  end

end
