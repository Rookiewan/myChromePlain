var URL = "http://www.rookiewan.wang/yoyaShared/";
chrome.extension.onRequest.addListener(
	function(request,sender,sendResponse){
		if(request.action == 'saveNick'){

			var nick = request.data.nick;

			localStorage.setItem('nick',JSON.stringify(nick));
			var dicReturn = {'status': 200};
			sendResponse(dicReturn);
		}else if(request.action == 'checkNick'){
			var nick = localStorage.getItem('nick');
			var status = 0;
			if(nick != null){
				status = 200;
			}else{
				status = 404;
			}
			var dicReturn = {'status': status, 'data': {'nick': nick}};
			sendResponse(dicReturn);
		}else if(request.action == 'collect'){
			/*var collectInfo = request.data;

			var collectList = localStorage['collect'];
			var dicList = [];

			if(collectList){
				dicList = JSON.parse(collectList);
			}

			dicList.push(collectInfo);

			localStorage['collect'] = JSON.stringify(dicList);*/
			var collectInfo = request.data;
			$.ajax({
				url:URL + '?index&A=collect',
				type:'POST',
				data:{
					//'data':request.data
					'title':collectInfo.title,
					'url':collectInfo.url,
					'nick':collectInfo.nick,
					'date':collectInfo.date
				},
				datatype:'json',
				success:function(response){
					var dicReturn = {'status': 200, 'data': {'responseText': response}};
					sendResponse(dicReturn);
				}
			});
		}else if(request.action == 'showList'){
			$.ajax({
				url:URL + '?index&A=showList&nick='+request.data.nick,
				type:'GET',
				datatype:'json',
				success:function(response){
					var collectInfo_json = $.parseJSON(response).collectInfo;
					var dicReturn = {'status': 200, 'data': {'responseText': collectInfo_json}};
					sendResponse(dicReturn);
				}
			});
		}else if(request.action == 'collect-del'){
			var delId = request.data.delId;
			var nick = request.data.nick;
			var responseText = '132';
			var status = 404;
			if(nick){
				$.ajax({
					url:URL + '?index&A=del&delId=' + delId + '&nick=' + nick,
					type:'GET',
					datatype:'json',
					success:function(response){
						status = 200;
						responseText = response;
						var dicReturn = {'status': status, 'data': {'responseText': responseText}};
						sendResponse(dicReturn);
					}
				});
			}
		}
	}
);
