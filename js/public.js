var srcnow = get_htm_name();
var sctop = '';                               //窗口滚动条高度
var wHeight = '';                            //窗口高度
var wWidth = '';                              //窗口宽度
var dHeight = '';                             //文档高度
var dWidth = '';                              //文档宽度
var aHeight = '';                             // 判断最终页面需要高度
var aWidth = '';                              // 判断最终页面需要宽度

function widthHeightGet() {
    sctop = $(window.top).scrollTop();
    wHeight = $(window.top).height();
    wWidth = $(window.top).width();
    dHeight = $(window.top.document).height();
    dWidth = $(window.top.document).width();
    aHeight = (wHeight > dHeight) ? wHeight : dHeight;
    aWidth = (wWidth > dWidth) ? wWidth : dWidth;
}
//弹窗高度变化
function targetH(id){
    var targetH=$('#'+id).height();
    var sctop=$(window.top).scrollTop();
    var wHeight2=$(window.top).height();
    $('#'+id).css({'top':sctop+wHeight2/2,'margin-top':-(targetH/2)});
    $("body").css({overflow:"hidden"});
}

/*页面菜单部分开始*/
var nowsrc = get_htm_name();
if(nowsrc==''){
    nowsrc='index.html'
}
var firstmenunow='';
$(function(){
    if(nowsrc!='login.html') {
        var content = '<ul class="menuUl">';
        for (var i = 0; i < menu_root.length; i++) {
            var imgs=menu_root[i].img;
            var name=imgs.split('/')[1].split('.')[0];
            content += '<li';
            if (srcok(menu_root[i])) {
                content += ' class="beChose"'
            }
            content += '>';
            content+='<a href="'+menu_root[i].src+'"><i class="'+name+'Icon"></i><p>'+menu_root[i].title+'</p></a></li>'
        }
        content += '</ul>';
        $('.menuBox').html(content);
    }


    var wH = $(window).height();
    var mH = $('.menuBox').height();
    var realH = (wH > mH) ? wH : mH;
    $('.menuBox').css('height',realH);
})

function srcok(obj) {
    if (obj.src == nowsrc) {
        return true;
    } else {
        if (typeof obj.child!='undefined' && obj.child.length > 0) {
            for (var n = 0; n < obj.child.length; n++) {
                if (obj.child[n].src!=''&& obj.child[n].src == nowsrc) {
                    return true;
                }else{
                    if (typeof obj.child[n].child!='undefined' && obj.child[n].child.length > 0 ) {

                        for (var i = 0; i < obj.child[n].child.length; i++) {
                            if (obj.child[n].child[i].src!=''&&obj.child[n].child[i].src == nowsrc) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}
/*页面菜单部分结束*/


//页面初始化data数据
function data_init(data) {
    for (var key in data) {
        if ($('#' + key).hasClass('text')) {							//直接显示文本，如span
            $('#' + key).html(data[key]);
        } else if ($('#' + key).hasClass('textClass')) {				//文本框
            $('#' + key).val(data[key]);
        } else if ($('#' + key).hasClass('switchClass')) {				//开关
            setOnOff(key, data[key]);
        } else if ($('#' + key).hasClass('mySelect')) {					//下拉列表
            select_chose_set(key, data[key]);
        } else if ($('#' + key).hasClass('hideinput')) {				//日期时间选择【点击才配置】
            $('#' + key).val(data[key]);
        } else if ($('#' + key).hasClass('checkModel')) {				//重构的复选框
            checkbox_select_set(key, data[key]);
        }else if ($('#' + key).attr('type') == 'checkbox') {			//系统默认复选框
            checkbox_set(key,  data[key])
        } else if ($('.' + key).hasClass('radioClass')) {				//单选按钮
            radio_checked_set(key, data[key]);
        }else if ($('#' + key).hasClass('percentage')) {				//百分比进度条
            setPercentAge(key, data[key]);
        }
    }
}
//获取ID对应的值
function data_id_get(id) {
    var s = '';
    if ($('#' + id).hasClass('text')) {							//直接显示文本，如span
        s = $('#' + id).html();
    } else if ($('#' + id).hasClass('textClass')) {
        s = $('#' + id).val();
    } else if ($('#' + id).hasClass('switchClass')) {
        s = getOnOff(id);
    } else if ($('#' + id).hasClass('mySelect')) {
        s = select_chose_get(id);
    }else if ($('#' + id).hasClass('checkModel')) {				//重构的复选框
        s = checkbox_select_get(id);
    } else if ($('#' + id).attr('type') == 'checkbox') {				//系统默认复选框
        s = checkbox_get(id);
    } else if ($('.' + id).hasClass('radioClass')) {				//单选按钮
        s = radio_checked_get(id);

    }
    return s;
}


//原生复选框取值
function checkbox_get(id) {
    if ($('#' + id).attr('checked') == 'checked') {
        return 1;
    } else {
        return 0;
    }
}
//原生复选框设置值
function checkbox_set(id, val) {
    if (val == 1) {
        $('#' + id).attr('checked', 'checked');
    } else {
        $('#' + id).removeAttr("checked")
    }

}


//原生单选按钮设置
function radio_checked_set(name, val) {
    var obj = document.getElementsByName(name);
    var flag = 0;
    for (var h = 0; h < obj.length; h++) {
        if (obj[h].value == val) {
            flag = 1;
            obj[h].checked = true;
        } else
            obj[h].checked = false;
    }
    if (flag == 0) {
        obj[0].checked = true;
    }
}
//原生单选按钮获取选取
function radio_checked_get(name) {
    var obj = document.getElementsByName(name);
    for (var h = 0; h < obj.length; h++) {
        if (obj[h].checked == true) {
            return obj[h].value;
        }
    }

    return obj.value;
}


//重构的复选框设置
function checkbox_select_set(id, val) {
    if (val == 1) {
        $('#' + id).addClass('beChose');
    } else {
        $('#' + id).removeClass('beChose');
    }
}
//重构的复选框选中获取
function checkbox_select_get(id) {
    if ($('#' + id).hasClass('beChose')) {
        return 1;
    } else {
        return 0;
    }
}
//复选框点击操作，需要在每个有复选框的页面初始化调用！
function checkbox_select_opt() {
    $('.checkModel').on('click', function () {
        if (!$(this).hasClass('beChose')) {
            $(this).addClass('beChose');
        } else {
            $(this).removeClass('beChose');
        }
    })
}


//模拟select下拉列表设置
function select_chose_set(id, val) {
    $('#' + id).find('li').each(function () {
        if ($(this).attr('data') == val) {
            $(this).addClass('beChose');
            $('#' + id).find('.selectSpan').text($(this).text());
            $('#' + id).find('.hideInput').val(val);
        }
    })
}
//模拟select下拉列表获取 返回具体选择的选项值，如果返回空，则表示未选择。
function select_chose_get(id) {
    var s = '';
    $('#' + id).find('li').each(function () {
        if ($(this).hasClass('beChose')) {
            s = $(this).attr('data');
        }
    })
    return s;
}
function select_chose_getShow(id) {
    var s = '';
    $('#' + id).find('li').each(function () {
        if ($(this).hasClass('beChose')) {
            s = $(this).text();
        }
    })
    return s;
}
//模拟select下拉列表设置空值
function select_chose_init(id) {
    $('#' + id).find('li.beChose').removeClass('beChose');
    $('#' + id).find('.selectSpan').text('');
    $('#' + id).find('.hideInput').val('');
    $('#' + id).find('.selectSpan').attr('title','');
}
//模拟select下拉列表操作，需要在每个有下拉列表的页面初始化调用！
function select_chose_opt() {
    $(".mySelect").each(function () {
        var ulBox = $(this).find("ul");
        var spanVal = $(this).find(".selectSpan");
        spanVal.attr('title', spanVal.text());
        var inputVal = $(this).find("input.hideInput");
        $(this).find("span.selectSpan,.selectArrow").die().live({
            click: function (e) {
                if (ulBox.css('display') == 'block') {
                    ulBox.hide();
                } else {
                    $(".mySelect").find("ul").hide();
                    ulBox.show();
                    return false;
                }
            }
        })
        ulBox.find("li").die().live('click', function () {
            var liVal = $(this).text();
            var liData = $(this).attr('data');
            $(this).addClass('beChose');
            $(this).siblings('li').removeClass('beChose');
            spanVal.text(liVal);
            spanVal.attr('title', spanVal.text())
            inputVal.val(liData);
            inputVal.click();
            ulBox.hide();
        });
        $(document).click(function () {
            $(".mySelect").find("ul").hide();
        })
    })
}


//安全退出
function safeExit(){
    delCookie("token");
    delCookie("storeId");
    delCookie("storeName");
    delCookie("userId");
    delCookie("userName");
    window.location.href="login.html";
}
function exceptionHandler(retObj){
    alert(retObj.msg);
    safeExit();
}

function cancel() {
    window.location.reload();
}
function okFun(data) {
    alert(data.msg);
    if (data.ret == 1){
        window.location.reload();
    }
}
function okFunReload(data){
    if(data.err) {//表示有错
        alert(data.err); 
    }else if(data.perm_err) {
        alert(data.perm_err);
    }else {
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }
}
function errFun() {
    alert("操作失败，请重试!");
}
function clearOptions(obj) {
    var length = obj.options.length;
    for (var i=length-1; i>=0; i--) {
        obj.options[i] = null;
    }
}




