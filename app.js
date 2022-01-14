//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let posts = [];

const vanMau1 = "OMAE CỐ TÌNH CHỬI WATASHI DESU KA? TỪ TANJOUBI ĐẾN KONNICHI, WATASHI ĐÃ ĐƯỢC OSOWARU NÊN HITO, WATASHI KHÔNG BAO GIỜ XÚC PHẠM DARE CẢ, OMAE LÀM VẬY LÀ TONDEMONAI DAYO.TUY WATASHI CÓ HƠI WIBU SUKOSHI, DEMO WATASHI LUÔN ĐẶT NIỀM TIN VÀO ANIME VÀ SỐNG ĐÚNG KIỂU TRONG ANIME, ANIME LÀ 1 THỨ GÌ ĐÓ CAO CẢ HƠN CẢ GENJITSU, WATASHI ĐÃ LÀM THEO VÀ HỌC TẬP THEO TỪ ANIME, WATASHI ĐÃ ĂN UỐNG NGỦ NGHĨ THEO ĐÚNG GIỜ CỦA ANIME MÀ KHÔNG LÀM PHIỀN DARE, ĐÔI LÚC WATASHI CÓ CHỬI VÀO OMAE NO KAO NHƯ INU, DEMO SAU ĐÓ BLOCK NÓ THÌ WATASHI KHÔNG LÀM VIỆC ĐÓ NỮA, MAIKAI MAIKAI WATASHI MUỐN CHỬI DARE WATASHI ĐỀU COI ANIME VÀ GHI NHỚ RẰNG KHÔNG NÊN CHỬI NGƯỜI ĐÓ NỮA !! WATASHI ĐÃ CỐ GẮNG HIỀN HẬU ĐẾN MỨC MUỐN THÀNH HOTOKE RỒI MÀ KARERA VẪN KHÔNG ĐỂ WATASHI YÊN LÀ SAO, YABAI WATASHI KHÔNG NÊN GHI RA NHỮNG TỪ NÀY DEMO THẰNG YAROU SÚC VẬT NÓ LÔI WATASHI NO NA RA ĐỂ CHỬI, THỨ AHO SHUKU SEIBUTSUGAKU KAGAKU BUNGAKU, VẬY LÀ ĐỦ, ĐỪNG ĐỂ WATASHI TRIGGERED VÀ WATASHI DẠY OMAE CÁCH ĐỂ HỌC TẬP VÀ LÀM THEO TẤM GƯƠNG CỦA ANIME NỮA!, THẾ NHÉ INU WA KUSO O TABERU";

const vanMau2 = "Mấy thằng ranh con trong đây đừng có nghĩ tao hay đùa trên cái mạng ảo này mà nghĩ ngoài đời tao là một thằng wibu hèn hạ đéo dám ra đường hay trầm cảm, tự kĩ nhé. Thật ra bố mày đéo phải một thằng wibu bệnh hoạn như chúng mày nghĩ đâu lũ óc cặc ạ. Tao đây là otaku đàng hoàng chân chính nhá. Kể từ khi lọt lòng tới nay tao đã cày hơn 10 triệu bộ anime và từ việc xem anime mỗi ngày tao đã thông thạo được 50 thứ tiếng trên toàn thế giới cùng với khả năng đọc vị bất kỳ ai. Chưa hết đâu. Kể từ năm 2017, khi mà xem One Punch Man tao đã giác ngộ được mọi triết lý trên đời và quyết tâm bảo vệ nền hòa bình thế giới. Vì lẽ đó nên tao đã tập tành như Saitama, mỗi ngày 1000 cái hít đất, 1000 cái gập bụng, 1000 cái bật nhảy và chạy 100km (gấp mười lần idol của tao). Và chưa đầy nửa năm tao đã luyện thành mình đồng da sắt, chỉ cần thằng nào đụng đến tao thì một cái búng tay cũng đủ để nó bay ra ngoài vũ trụ với vận tốc gấp 10 lần tốc độ ánh sáng. Nếu thằng nào trong này cả gan chửi tao thì nên biết tao là ai trước đi, đề phòng chết khi nào không hay đấy.";

const vanMau3 = "ĐỊT CON ĐĨ MẸ NHÀ MÀY LÚC SÚC VẬT, WIBU THÌ ĐÃ SAO HẢ MẤY CON CHÓ ĂN CỨC RẢNH LỒN KHÔNG CÓ CHUYỆN GÌ LÀM ĐI GATO VS WIBU HẢ? WIBU ĂN HẾT CÁI LỒN CON ĐĨ MẸ MÀY HAY GÌ CỨ HỞ TÍ WIBU LÀ SAO HẢ CÁI CON THÚ HOANG RÁC RƯỞI, ĐỊT HẾT CÁC ĐỜI TỔ TÔNG GIA PHẢ NHÀ CON ĐĨ MẸ MÀY, TAO WIBU THÌ SAO? TỤI MÀY KO ĐC LÀM WIBU NHƯ TỤI TAO RỒI TỤI M TỨK HẢ? TỤI MÀY ĐÉO CÓ GỐI ÔM CỦA REM ĐỂ ĐỤ NÊN TỨK HẢ? TỤI MÀY ĐÉO CÓ THIỂU NĂNG NHƯ TỤI TAO TỤI MÀY TỨK HAY GÌ? TAO LÀ 1 WIBU CHÂN CHÍNH NÊN ĐỪNG ĐỤNG VÔ TỤI TAO, NẾU CÒN ĐỤNG VÔ THÌ TAO SẼ HOÁ ZORO CẦM 3 THANH KIẾM CHÉM MÀY RA HÀNG TRĂM MẢNH RỒI CHO CÁ SẤU ĂN ĐÓ, ĐỤ MẸ TỤI T NGỒI K CŨNG CÓ ĂN NÈ ĐÂU NHƯ TỤI M LÀM NHƯ CHÓ TỚI CUỐI THÁNG MỚI CÓ LƯƠNG ĐÂU, TỤI TAO NGỒI K ĂN BÁT VÀNG NÈ CON ĐĨ MẸ TỤI MÀY, TAO TỨK QUÁ MÀ, DÒNG ĐĨ NỨNG LỒN, NỨNG CẶC GÌ ĐÂU K À ";

////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.render("van-mau-1", {
    vanMau1: vanMau1,
    posts: posts
  });
})

app.get("/vanmau2", (req, res) => {
  res.render("van-mau-2", {vanMau2: vanMau2});
})

app.get("/vanmau3", (req, res) => {
  res.render("van-mau-3", {vanMau3: vanMau3});
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  
  posts.push(post);

  res.redirect("/");
})

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.toLower(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = _.toLower(post.title);
    
    if(storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
   
  })
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
