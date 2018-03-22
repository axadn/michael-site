class ApplicationController < ActionController::Base
  ##protect_from_forgery with: :exception
  def login(user)
    logout(user.session) if user.logged_in?
    loop do
        new_session = Session.new token: SecureRandom.urlsafe_base64,
            user: user
        session[:session_token] = new_session.token
        break if new_session.save
    end
  end

  def logout(sessionRecord)
    sessionRecord.destroy
    session[:session_token] = nil
  end

end
