var lang = {
	/* 'en_PH': 'Filipino', */
	/* 'zh_TW': '繁體中文', */
	'en_US': 'English',
	/* 'vi_VN': 'Tiếng Việt', */
	/* 'th_TH': 'ไทย', */
	'hi-IN': 'Hindi',
    /* 'zh_CN': '简体中文', */
};  
var nowLang = "";
if (typeof lang != "undefined") {
	Object.keys(lang).forEach(key => {
		// console.log(key, lang[key]);
		// console.log(window.location.href.indexOf(key.toString()));
		if (window.location.href.indexOf(key.toString()) > 0) {
			// console.log(window.location.href.indexOf(key.toString()));
			nowLang = key;
		}
	});
}
if(nowLang == ""){
	nowLang = "Hindi";
}