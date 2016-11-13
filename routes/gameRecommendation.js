var cheerio = require('cheerio'),
	request = require('request');

var gameRecommendation = function() {
	this.author = "4ntiweb";
	this.gammingLaptop = ["MSI GP62-6QF Leopard Pro", "레노버 아이디어패드 Y700 Sky Kaiser 15", "DELL 인스피론 15 7559 D730I7559301KR", "한성컴퓨터 XH56 BossMonster Hero6100", "레노버 700-i5 Quad"];
	this.banner = [{name: "MSI GP62-6QF Leopard Pro", prize: "1,048,900", content: "GTX960M 그래픽과 6세대 i7 CPU로 최상급 게이밍 퍼포먼스 실현!", img:"http://shopping.phinf.naver.net/main_9363774/9363774409.20160328180418.jpg?type=f140", href: "http://shopping.naver.com/detail/detail.nhn?nv_mid=9363774409&cat_id=50000151&frm=NVSHATC&query=MSI+GP62-6QF+Leopard+Pro"}, {name: "LG전자 PC그램 14ZD960-GX70K", prize: "1,199,000", content: "980g에 어울리는 14인치 최적의 크기! 성능까지 울트라급!", img: "http://shopping.phinf.naver.net/main_9265769/9265769181.20160108110813.jpg?type=f140", href:"http://shopping.naver.com/detail/detail.nhn?nv_mid=9265769181&cat_id=50000151&frm=NVSHATC&query=14ZD960-GX70K"}, {name: "APPLE 맥북프로 MF840KH/A", prize: "1,511,200", content: "한 차원 향상된 성능 제공! 레티나 디스플레이 맥북프로~", img: "http://shopping.phinf.naver.net/main_8549313/8549313669.20160913104532.jpg?type=f140", href: "http://shopping.naver.com/detail/detail.nhn?nv_mid=8549313669&cat_id=50000151&frm=NVSHATC&query=MF840KH%2FA"}, {name: "LG전자 울트라PC 15UD560-GX3FK", prize: "635,840", content: "6세대 i3 성능과 광시야각의 생생한 화질! 15인치 휴대용 울트라PC", img: "http://shopping.phinf.naver.net/main_9334591/9334591511.20160906120606.jpg?type=f140", href: "http://shopping.naver.com/detail/detail.nhn?nv_mid=9334591511&cat_id=50000151&frm=NVSHATC&query=15UD560-GX3FK"}, {name: "MSI GL62 6QE-i5", prize: "798,900", content: "6세대 쿼드코어 CPU와 GTX950M으로 무장한 가성비 게이밍 노트북", img: "http://shopping.phinf.naver.net/main_9685223/9685223331.20160818120453.jpg?type=f140", href: "http://shopping.naver.com/detail/detail.nhn?nv_mid=9685223331&cat_id=50000151&frm=NVSHATC&query=6QE-i5"}];
	this.retArr = [];
}

gameRecommendation.prototype.parseNaverGame = function(cbData) {
	request("http://datalab.naver.com", function(err, res, html){
		if(err) throw err;
		else {
			var $ = cheerio.load(html);
			var list = $('span.title');
			var retarr = [];

			for(var i = 50; i < 55; i++)
				retarr.push(list[i].children[0].data);
			cbData(retarr);
		}
	});
}
gameRecommendation.prototype.parseSteamGame = function(cbData) {
	request("http://store.steampowered.com/tag/en/Action/#p=0&tab=TopSellers", function(err, res, html){
		if(err) throw err;
		else {
			var $ = cheerio.load(html);
			var list = $('div.tab_item_name');
			var retarr = [];

			for(var i = 10; i < 15; i++)
				retarr.push(list[i].children[0].data);
			cbData(retarr);
		}
	})
}

gameRecommendation.prototype.parseGame = function(cbData) {
	var that = this;
	this.parseNaverGame(function(retNaverData){
		that.parseSteamGame(function(retSteamData){
			that.retArr.push({"naverGame": retNaverData, "steamGame": retSteamData, "gammingLaptop": that.gammingLaptop, "banner": that.banner});
			cbData(that.retArr);
		});
	});
}

exports.gameRecommendation = gameRecommendation;