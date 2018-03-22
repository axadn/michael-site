Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'root#show'
  scope '/api' do
    resources :products
    resources :addresses, except: [:index]
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show] do
      resources :addresses, only: [:index]
      resource :cart, only: [:show, :update, :destroy]
    end
  end
end