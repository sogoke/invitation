# ClientSideValidations Initializer

#require 'client_side_validations/simple_form' if defined?(::SimpleForm)
#require 'client_side_validations/formtastic'  if defined?(::Formtastic)

# Uncomment the following block if you want each input field to have the validation messages attached.
 ActionView::Base.field_error_proc = Proc.new do |html_tag, instance|
   %{#{html_tag}<strong class="avatarError" style="display:inline"><img src="assets/error.png" class="icon" /><span class="message">#{instance.error_message.first}</span></strong>}.html_safe
 end

