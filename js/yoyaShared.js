
$(document).ready(function(){
	
	checkNick();
	template_self = $('#container-self').html();
	template_all = $('#container-all').html();
	$('#savaNick').click(function() {
		savaNick();
	});
	$('#nickName').keyup(function(e){
		var e = e || window.event;
		if(e.keyCode == 13){
			savaNick();
		}
		
	});

	
	$('#btn-collect').click(function(){
		chrome.tabs.getSelected(function(w){
			sharedTitle = w.title;
			sharedUrl = w.url;
			var date = new Date().toLocaleDateString();
			/*chrome.extension.sendRequest({greeting: 'hello'},function(response){
				alert(response.farewell);
			});*/
			sendMessageBack('collect',{'title':sharedTitle,'url':sharedUrl,'nick':nick,'date':date},function(response){
				if(response.status == 200){
					var rst = response.data.responseText;
					if(rst > 0){
						layer.msg('收藏成功');
					}else if(rst == 0){
						layer.msg('已经收藏过啦');
					}else{
						layer.msg('收藏失败');
					}
					
				}else{
					layer.msg('收藏失败');
				}
			});
		});

	});

	$('#personalShare').click(function() {
		getList('ps',function() {
			$('#personal').animate({
				left: 0
			},animateTime);
		});
	});

	$('#publicShare').click(function(){
		getList('pb',function() {
			$('#public').animate({
				left: 0
			},animateTime);
		});
	});

	$('#psBack').click(function() {
		backToHome('personal');
	});
	$('#pbBack').click(function() {
		backToHome('public');
	});


	$('#collect-self').click(function(){
		$('#container-self').find('.share-item').toggle(400);
	});
	$('#collect-all').click(function(){
		$('#container-all').find('.share-item').toggle(400);
	});
	$(document).on('click','.item-del',function(){
		var _this = $(this);
		var delId = _this.attr('item-id');
			
		
		if(nick){
			if(confirm('是否删除这条收藏？')){
				sendMessageBack('collect-del',{'delId':delId,'nick':nick},function(response){
					if(response.status == 200){
						layer.msg('删除成功');
						_this.parent().remove();
					}else{
						layer.msg('删除失败');
					}
				});
			}else{
				return;
			}
		}else{
			$('#register').css({
				'z-index': 99999,
				'display': 'block'
			});
		}
	});
	
});

var nick;
var sharedUrl;
var sharedTitle;
var animateTime = 600;
var template_self ='';
var template_all = '';

function savaNick(){
	var _nick = $.trim($('#nickName').val());
	if(_nick){
		sendMessageBack('saveNick',{'nick':_nick},function(response){
			if(response.status == 200){
				nick ='"' + _nick + '"';
				layer.msg('设置成功');
				$('#home').animate({
					left: 0
				},animateTime);
			}
		});
	}else{
		layer.msg('不能为空');
		return;
	}
}

function checkNick(){
	sendMessageBack('checkNick',{},function(response){
		if(response.status == 200){
			//$('#btns').css('display','block');
			$('#home').css('left',0);
			nick = response.data.nick;
		}else{
			$('#register').css('display','block');
		}
	});
}

function getList(type,callback) {
	sendMessageBack('showList',{'nick':nick},function(response){
		if(response.status = 200){
			collectInfo_json = response.data.responseText;
			if(type == 'ps') {//个人
				$('#container-self').empty();
				var html_self = [];
				for(var s in collectInfo_json){
					if(collectInfo_json[s].nick == nick){
						var _html_self = template_self
													 .replace(/{{title}}/g,collectInfo_json[s].title)
													 .replace(/{{url}}/,collectInfo_json[s].url)
													 .replace(/{{id}}/,collectInfo_json[s].id);
						html_self.push(_html_self);
					}
				}

				$('#container-self').html(html_self.join(''));
			}else if(type == 'pb') {//公共
				$('#container-all').empty();
				var html_all = [];

				for(var s in collectInfo_json){
					var _html_all = template_all
												.replace(/{{title}}/g,collectInfo_json[s].title)
												.replace(/{{url}}/,collectInfo_json[s].url)
												.replace(/{{nick}}/,collectInfo_json[s].nick);
					html_all.push(_html_all);
				}
				$('#container-all').html(html_all.join(''));
			}
			
			callback();

		}else{
			layer.msg('查询失败');
		}
	});
	callback();
}

function backToHome(id) {
	$('#' + id).animate({
		left: '255px'
	},animateTime);
}
/**
 * 向background发送消息
 * @params strAction string 执行方法
 * @params dicData dict 数据字典
 * @params callback function 回调函数
 */
function sendMessageBack(strAction, dicData, callback){
	chrome.extension.sendRequest({'action': strAction, 'data': dicData},callback);
}