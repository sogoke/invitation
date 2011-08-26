Invitation::Application.routes.draw do
  root :to => "home#index"
  
  get "/about" => "home#about"
  get "/join" => "home#join"
  
  resources :artists, :only => [:create]
end
