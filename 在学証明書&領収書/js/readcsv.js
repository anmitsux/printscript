var reader;
var progress = document.querySelector('.percent');

$(function(){

  $('.close').click(function(){
    $('.preview').fadeOut("slow");
  });
  $('.notifi_close').click(function(){
    $('.notification').fadeOut("slow");
  });
  $('#preview_btn').click(function(){
    $('.preview').fadeIn("slow");
  });
  $('.print_btn').click(function(){

    var mainarea=$('main').html();
    var childrenPreview=$('.preview').children();
    $('body main').empty();

    $('body').append(childrenPreview);

    // var areatext = $('.preview').html();
    // var htmldoc = document.body.innerHTML;
    //     document.body.innerHTML = areatext;
      window.print();
      // $('body .print_row').remove();
      // $('body .close').remove();
      // $('body .print_btn').remove();
      // $('main').html(mainarea);
      location.reload()
      // document.body.innerHTML = htmldoc;

  });
});

  //
  // $(function() {
  //   $('#graduate_input').keyup(function(e) {
  //
  //   });
  // });
function abortRead() {
  reader.abort();
}
function updateProgress(evt) {
  // evt is an ProgressEvent.
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    // Increase the progress bar length.
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}
function handleFileSelect(evt) {
  if($('#graduate_prospects_input').val()==""){
    $('.notification').fadeIn("slow");
    document.getElementById('files').removeEventListener('change', handleFileSelect);
    return;
  }
   var files = evt.target.files[0]; // FileList object
   progress.style.width = '0%';
   progress.textContent = '0%';

  //  if($('#graduate_input').val() != ""){
  //    $('#print_btn').css('display','inline-block');
  //    $('#preview_btn').css('display','inline-block');
  //  }else{
  //    $('#list').text("卒業年月日を入力してください");
  //    exit();
  //  }
　
   reader = new FileReader();
   reader.onprogress = updateProgress;
   reader.onabort = function(e) {
    alert('File read cancelled');
   };
   reader.onloadstart = function(e) {
    document.getElementById('progress_bar').className = 'loading';
   };
   reader.onload = function() {
     progress.style.width = '100%';
     progress.textContent = '100%';
     var keyarray=[];
     var allKeyData=[];
      var allreplace=new RegExp( /\"/, "g" );
      var lineArr = reader.result.split("\n");
      var itemArr = [];

      var exitday = dateWithoutDay($('#graduate_prospects_input').val().toString());
      // console.log(graduate_prospects_date);
      for (var i = 0; i < lineArr.length-1; i++) {
          itemArr = lineArr[i].split(",");
          keyarray={
            school_no:itemArr[1].replace(allreplace,''),
            name:itemArr[2].replace(allreplace,''),
            birthday:itemArr[6].replace(allreplace,''),
          };
          console.info(keyarray);
          allKeyData.push(keyarray);

      }
      var thisdate = new Date();
      var thisDay=thisdate.getDate()+"日";
      var thisMonth=(thisdate.getMonth()+1)+"月";
      var thisYear=yearF(thisdate.getFullYear());
      var onlyyear = onlyYear(thisdate.getFullYear()+"-"+(thisdate.getMonth()+1)+"-"+thisdate.getDate());
      console.log(allKeyData);
      var insert="";

          for (var i = 1; i < lineArr.length-1; i++) {

            insert+='<div class="wrap"><div class="print_row">';
            insert+='<div class="publish_no">こども學舎-証 '+onlyyear+'-11-'+serialNo(String(i))+' 号</div>';
            insert+='<div class="text_title">在  学  証  明  書</div>';
            insert+='<div class="nameAndbirthdayAndexitday">';
              insert+='<div class="name">'+"【氏　　名】 "+allKeyData[i]["name"]+'</div>';
              insert+='<div class="birthday">'+"【生年月日】 "+date(allKeyData[i]["birthday"])+'</div>';
              insert+='<div class="exitday">'+"【入学年月】 "+exitday+'</div>';
            insert+='</div>'
            insert+='<div class="mid_text">上記の者が在学していることを証明する。</div>';
            insert+='<div class="publish_date">'+thisYear+thisMonth+thisDay+'</div>';
            insert+='<div class="last_text_b"><span>指定保育士養成施設　こども學舎</span><span>施　設　長　 　河 村 　敦　子　</span><div><img width="90" height="90" src="https://lh3.google.com/u/0/d/0B2rk3X5Ek1qKNzh4Z0lCUFU0U2c=w1920-h857-iv1"></div></div>';
            insert += '</div></div>';

            insert+='<div class="wrap"><div class="print_row">';
            insert+='<div class="text_title_receipt">領　収　書</div>';
            insert+='<div class="noAnddate"><div class="publish_no_receipt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No： '+onlyyear+'-15-'+serialNo(String(i))+'</div><div class="publish_date_receipt">発⾏⽇： '+thisYear+thisMonth+thisDay+'</div></div>';
            insert+='<div class="name_receipt">'+allKeyData[i]["name"]+'</div>';
            insert+='<div class="moneyarea">￥100-</div>';
            insert+='<div class="mid_text_receipt">但し　通学証明書発⾏費⽤として<br>上記の⾦額正に受領いたしました</div>';
            insert+='<div class="proviso">こども學舎<div><img width="90" height="90" src="https://lh3.google.com/u/0/d/0B2rk3X5Ek1qKNzh4Z0lCUFU0U2c=w1920-h857-iv1"></div></div>';
            insert+='<div class="last_text_receipt">〒060-0042<br>札幌市中央区⼤通⻄18丁⽬2−8 １階<br>TEL：011-616-1771<br>FAX：011-616-1773</div>';
            insert+='</div></div>';
          }

          $(insert).appendTo($('.preview'));

   }

   // Read in the image file as a data URL.
   reader.readAsText(files);
//  }
}
function date(str) {
    var date = str.match(/(\d+).(\d+).(\d+)/);
    var newDate = yearF(date[1])+String(afterYear(date[2]))+"月"+String(afterYear(date[3]))+"日";
    return newDate;
}
function dateWithoutDay(str){
  var date = str.match(/(\d+).(\d+).(\d+)/);
  var newDate = yearF(date[1])+String(afterYear(date[2]))+"月";
  return newDate;
}
function onlyYear(str){
  var date = str.match(/(\d+).(\d+).(\d+)/);
  var val;
      val = date[1] - 1988;
  return val;
}
function afterYear(date) {
    var val;
    var temp;
    if (date.match(/0\d+/)){
      temp = date.match(/0(\d+)/);
      val = temp[1];
    }else{
      val = date
    }
    return val;
}
function yearF(year) {
    var val;
    if (year > 1988) { //平成
        val = year - 1988;
        // val=toKannum(String(val));
        val = "平成" + val + "年"
    } else if (year > 1925) { //昭和
        val = year - 1925;
        // val=toKannum(String(val));
        val = "昭和" + val + "年";
    }
    return val;
}
function toKannum(num){
  var ten = "十";
  var kannum = new Array("〇","一","二","三","四","五","六","七","八","九");
  var strA="";
  var strB="";
  var length = num.length;
  if(length==1){
    return kannum[eval(num)];
  }else if(length==2){
    if(num.charAt(0)==1){
      if(num.charAt(1)==0){
        strA=ten;
      }else{
        strA=ten;
        strB=kannum[eval(num.charAt(1))];
      }
    }else{
      if(num.charAt(1)==0){
        strA=kannum[eval(num.charAt(0))];
        strB=ten;
      }else{
        strA=kannum[eval(num.charAt(0))]+ten;
        strB=kannum[eval(num.charAt(1))];
      }
    }
  }

  return strA+strB;
}
function tokannumall(befText){
  var text = String(befText);
  var txt = new Array("〇","一","二","三","四","五","六","七","八","九");
  var str = "";
  var c="";
  for(var i=0; i<text.length; i++){
    c = txt[eval(text.charAt(i))];
    str += c;
  }
  return str;
}
function serialNo(num){
    if(num.length==1){
      return '00'+num;
    }else if(num.length==2){
      return '0'+num;
    }else{
      return num;
    }
}


document.getElementById('files').addEventListener('change', handleFileSelect, false);
