Invitation::Application.routes.draw do
  root :to => "home#index"
  
  get "/join_us" => "home#join_us"
  get "/about_us" => "home#about_us"
  
  resources :artists, :only => [:create]
end
