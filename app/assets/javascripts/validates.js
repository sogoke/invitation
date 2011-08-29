jQuery.validator.addMethod("notEqual", function(value, element, param) {
  return this.optional(element) || value != param;
}, "Please specify a different (non-default) value");

$("form.request").validate({
	 debug: true,
   onfocusout: function(element) { $(element).valid(); },
   submitHandler: function(form) { form.submit(); },
	 rules: {
	   "artist[name]": {
		   required: true,
		   minlength: 2,
			 notEqual: "你的真实姓名，或网络昵称"
		 },
	   "artist[email]": {
	     required: true,
	     email: true
	   },
		 "artist[description]": {
			 maxlength: 140
		 }
	 },
	 messages: {
		 "artist[name]": {
			 required: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>昵称不能为空</span></strong>",
			 minlength: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>长度应大于2</span></strong>",
			 notEqual: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>昵称不可为空</span></strong>"
		 },
		 "artist[email]": {
			 required: "<strong class='emailError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>邮箱不可为空</span></strong>",
			 email: "<strong class='emailError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>邮箱格式不对</span></strong>"
		 },
		 "artist[description]": {
			 maxlength: ""
		 }
	 }
})