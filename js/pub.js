/**
 * 提交数据(POST方式获取，返回json格式)
 * @param url_str URL地址，自动encodeURI，不带参数
 * @param data_obj 参数：Object对象
 * @param succ_fun 成功后的回调函数
 * @param err_fun 失败后的回调函数
 */
function ajax_post(url_str, data_obj, succ_fun, err_fun) {
	var nv = {};
	for (var key in data_obj)
		nv[key] = encodeURIComponent(data_obj[key]);
	if (typeof err_fun == "undefined")
		err_fun = load_data_err;

	$.ajax({
		type: "POST",
		url: encodeURI(url_str),
		data: data_obj,
		beforeSend: function (XMLHttpRequest) {
			var bodyHeight = $("body").height();
			$("body").prepend('<div id="_TOPDIVCOVER_" style="width:100%;height:' + bodyHeight + 'px;position:absolute;z-index:999;"></div>');
		},
		success: function (data) {
			try {
				if (typeof data.ret_msg != "undefined")
					alert(data.ret_msg);
				else
					succ_fun(data);
			} catch (err) {
			}
		},
		async: true,
		error: err_fun,
		complete: function (XMLHttpRequest, textStatus) {
			$("div#_TOPDIVCOVER_").remove();
		},
		timeout: 10000,
		dataType: "json",
		cache: false
	});
}

function post(url_str, data_obj, succ_fun, err_fun) {
	var nv = {};
	for (var key in data_obj)
		nv[key] = encodeURIComponent(data_obj[key]);
	if (typeof err_fun == "undefined")
		err_fun = load_data_err;

	$.ajax({
		type: "POST",
		url: encodeURI(url_str),
		data: data_obj,
		beforeSend: function (XMLHttpRequest) {
			var bodyHeight = $("body").height();
			$("body").prepend('<div id="_TOPDIVCOVER_" style="width:100%;height:' + bodyHeight + 'px;position:absolute;z-index:999;"></div>');
		},
		success: function (data) {
			try 
			{
				if (typeof data.ret == "undefined" || data.msg == "undefined")
				{
					alert("请求失败!");
				}
				else if (data.ret < 0)
				{
					exceptionHandler(data);
				}
				else
				{
					succ_fun(data);
				}	
			}
			catch (err) 
			{
				
			}
		},
		async: true,
		error: err_fun,
		complete: function (XMLHttpRequest, textStatus) {
			$("div#_TOPDIVCOVER_").remove();
		},
		timeout: 10000,
		dataType: "json",
		cache: false
	});
}

function ajax_get_data(url_str,succ_str,err_str)
{
	$.ajax({
		type: "GET",
		url: url_str,
		success:function (data){
			try{
				if(data.perm_err)
					alert(data.perm_err);
				else
					succ_str(data);
			}catch(err){}
		},
		async: false,      //ajax同步
		error: err_str,
		timeout: 4000,
		dataType: "json"	,
		cache: false
	});
}


function load_data_err(data, status, e) {
	//alert("操作失败，请重试！");
	//alert(this.url + " load err" + " data:" + data + " status:" + status + " e:" + e );
}


//**获取页面参数
function get_param(id) {
	var url = window.location.href;
	if (url.lastIndexOf('?') == -1) return "";
	var params = url.split('?')[1];
	if (params.length == 0) return "";
	var p = {};
	var r = params.split('&');
	for (var i = 0; i < r.length; i++) {
		if (r[i].indexOf('=') == -1) continue;
		var a = r[i].split('=');
		p[a[0]] = a[1];
	}

	return typeof p[id] == 'undefined' ? '' : decodeURI(p[id]);
}

//**获取页面名称
function get_htm_name() {
	var l = window.location.href;
	var s = l.lastIndexOf('/') + 1;
	l = l.substring(s);
	var e = l.indexOf('?');
	return (e == -1) ? l : l.substring(0, e);
}
/**
 * 页面跳转
 * @param url
 */
function pageJump(url) {
	window.location.href = encodeURI(url);
}

//**添加cookie
function addCookie(objName, objValue, objSecond) {
	var str = objName + "=" + escape(objValue);
	if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
		var date = new Date();
		var ms = objSecond * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
alert("添加cookie成功");
}
//**获取指定名称的cookie的值
function getCookie(objName) {
	var arrStr = document.cookie.split("; ");
	for (var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName) return unescape(temp[1]);
	}
	return "";
}
//**为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
function delCookie(name) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = name + "=a; expires=" + date.toGMTString();
}
//**读取所有保存的cookie字符串
function allCookie() {
	var str = document.cookie;
	if (str == "") {
		str = "没有保存任何cookie";
	}
	alert(str);
}

//**页面提交时将对象生成为参数串
function my_serialize_obj(obj) {
	var str = "", i = 0;
	for (var k in obj) {
		if (i != 0)
			str += ("&" + k + "=" + obj[k]);
		else
			str += (k + "=" + obj[k]);
		i++;
	}
	return str;
}
//**页面提交时将对象生成为参数串，注：老数据没有或者已经被改过的部分才会生成
function my_serialize(obj, old) {
	var str = "", i = 0;
	for (var k in obj) {
		if (obj[k] == old[k])
			continue;
		if (i != 0)
			str += ("&" + k + "=" + obj[k]);
		else
			str += (k + "=" + obj[k]);
		i++;
	}
	return str;
}


