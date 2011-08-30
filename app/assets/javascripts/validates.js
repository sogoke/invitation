function checkUser(token, value){
	var exist = false;
	$.ajax({
		async: false,
	  url: "/artists/exist?token="+token+"&"+token+"="+value,
		dataType: 'json',
	  success: function( data ){
	  	exist = data['exist'];
		}
	});
	return exist;
}

jQuery.validator.addMethod("notEqual", function(value, element, param) {
  return this.optional(element) || value != param;
}, "Please specify a different (non-default) value");

jQuery.validator.addMethod("userNameUniqueness", function(value, element, param) {
	  return checkUser("name", value);
}, "Name is not unique");

jQuery.validator.addMethod("userEmailUniqueness", function(value, element, param) {
	  return checkUser("email", value);
}, "Email is not unique");

jQuery.validator.addMethod('userNameValid', function (value) { 
    return /^[\w\u4e00-\u9fa5]+$/.test(value); 
}, "wrong");

$("form.request").validate({
   onfocusout: function(element) { $(element).valid(); },
   submitHandler: function(form) { 
	     if($("#artist_description").val() === "介绍自己，让我们了解你，可以加上你常去的论坛ID，淘宝店铺、博客地址、微博等等"){
	         $("#artist_description").val("");
	     }
	     form.submit(); 
	 },
	 rules: {
	   "artist[name]": {
		   required: true,
		   minlength: 2,
			 maxlength: 30,
			 notEqual: "你的真实姓名，或网络昵称",
			 userNameUniqueness: true,
			 userNameValid: true
		 },
	   "artist[email]": {
	     required: true,
	     email: true,
	     userEmailUniqueness: true
	   },
		 "artist[description]": {
			 maxlength: 140
		 },
		 "artist[avatar]": {
			 accept: "jpg|jpeg|gif|png"
		 }
	 },
	 messages: {
		 "artist[name]": {
			 required: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>昵称不能为空</span></strong>",
			 minlength: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>昵称长度应大于2</span></strong>",
			 maxlength: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>昵称长度应小于30</span></strong>",
			 notEqual: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>昵称不可为空</span></strong>",
			 userNameUniqueness: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>昵称已被占用</span></strong>",
			 userNameValid: "<strong class='nicknameError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>中英文、数字与下划线</span></strong>"
		 },
		 "artist[email]": {
			 required: "<strong class='emailError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>邮箱不可为空</span></strong>",
			 email: "<strong class='emailError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>邮箱格式不对</span></strong>",
			 userEmailUniqueness: "<strong class='emailError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>邮箱已被注册</span></strong>"
		 },
		 "artist[description]": {
			 maxlength: ""
		 },
		 "artist[avatar]": {
			 accept: "<strong class='avatarError' style='display: inline'><img src='assets/error.png' class='icon' /><span class='message'>图片格式不对</span></strong>"
		 }
	 }
});