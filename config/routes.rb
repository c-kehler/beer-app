Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/users/verify', to: 'users#verify'
  post '/favorites/:user_id/:beer_id', to: 'favorites#favorites'
  get '/favorites/:user_id', to: 'favorites#show_favorites'
  get '/beers/name', to: 'beers#name'
  resources :users
  resources :beers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
