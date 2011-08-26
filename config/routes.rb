Invitation::Application.routes.draw do
  root :to => "home#index"
  
  get "/contact" => "home#contact"
  get "/join" => "home#join"
  
  resources :artists, :only => [:create]
end
