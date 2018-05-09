Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'root#show'
  get '/admin', to: 'admin#show'
  scope '/api', constraints: { format: 'json' } do
    resources :products
    put '/products', to: 'products#batch_update'
    get '/salesRecords', to: 'salesRecords#show'
    resources :addresses, except: [:index]
    resource :session, only: [:create, :destroy]
    resource :cart, only: [:show, :update, :destroy]
    resources :users, only: [:create, :show] do
      resources :addresses, only: [:index]
    end
  end
end