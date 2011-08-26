Invitation::Application.routes.draw do
  root :to => "home#index"
  
  get "/contact_us" => "home#contact_us"
  get "/about_us" => "home#about_us"
  
  resources :artists, :only => [:create]
end
