let addnn = document.getElementById("addgif");;
let boxAdd = document.getElementById("ShowLog");
let videoAddn;
let loopGif;

document.getElementById("open").onclick = function () {
	var qq = document.getElementById("txt").value
	addnn.innerHTML= ""
	boxAdd.innerHTML= "<h3>loading...</h3>"
	
fetch("package/tenor.json")
.then(response => response.json())
.then(data => {
	var token = data.token_user
	addHeader(token)
	})
	function addHeader(token) {
		const mod = {
			"q": qq,
			"key": token,
			"client_key": "my_test_app",
			"limit": 30
			};
			
		fetch("https://tenor.googleapis.com/v2/search?" + new URLSearchParams(mod).toString(), {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
				},
			})
			.then(response => response.json())
			.then(data => {
				var errorFix = data.error
				if (!errorFix) {
				addnn.innerHTML = "";
				boxAdd.innerHTML= "";
				var a = data.results
				for(var i = 0; i < a.length; i ++) {
					var gif_url = a[i].media_formats.gif.url
					var video_url = a[i].media_formats.loopedmp4.url
				    var num = i
				    var addNum = 1 + i
					var line = "\n"
					var line2 = "\n\n"
				/*console.log("Gif Link:" + line + gif_url + line2 + "Loop video Link:" + line + video_url)*/
				addHtml(num, addNum, video_url, gif_url);
				loopGif = document.getElementById("imgAdd-" + num);
				loopGif.src = gif_url;
				
			}
			console.warn(data)
			function addHtml(num, addNum, video_url, gif_url) {
				addnn = document.getElementById("addgif");
				var itemsAdd = `
				<div class = "addT">
				<img id ="imgAdd-${num}" width ="200">
				<div class = "text">
				<h1>items ${addNum}
               </h1>
               <h2>
                 Video: <a href = "${video_url}">here</a>
                 </h2>
                 <h2>
                 Gif: <a href = "${gif_url}">here</a>
                 </h2>
                 </div>
				</div>
				`
				addnn.innerHTML += itemsAdd;
			}
		} else {
		addnn.innerHTML= ""
	boxAdd.innerHTML= "<h3>Search Failed</h3>"
	}
		})
		.catch(error => {
			console.error(error)
	});
	
}
}