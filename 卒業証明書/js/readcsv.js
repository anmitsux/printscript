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
  if($('#facility_graduate_input').val()==""){
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
      var onlyyear = onlyYear($('#facility_graduate_input').val().toString());
      var facility_graduate_date = dateWithoutDay($('#facility_graduate_input').val().toString());
      // console.log(facility_graduate_date);
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

      console.log(allKeyData);
      var insert="";

          for (var i = 1; i < lineArr.length-1; i++) {

            insert+='<div class="wrap"><div class="print_row">';
            insert+='<div class="publish_no">'+onlyyear+'-12-'+serialNo(String(i))+'</div>';
            insert+='<div class="text_title">指定保育士養成施設卒業証明書</div>';
            insert+='<div class="nameAndbirthday">';
              insert+='<div class="name">'+"氏　　名 "+allKeyData[i]["name"]+'</div>';
              insert+='<div class="birthday">'+"生年月日 "+date(allKeyData[i]["birthday"])+'</div>';
            insert+='</div>'
            insert+='<div class="mid_text">　児童福祉法第十八条の六第一号の規定により指定された指定保育士養成施設において児童福祉法施行規則第六条の二第一項第三号の規定による修業教科目及び単位数を同号の規定により履修して卒業したものであることを証明する。</div>';
            insert+='<div class="facility_graduate_date">【卒業年月：'+facility_graduate_date+'】'+'</div>';
            insert+='<div class="publish_date">'+thisYear+thisMonth+thisDay+'</div>';
            insert+='<div class="last_text_a"><span>施設所在地　札幌市中央区大通西18丁目2番8号　1階</span><span>施設名称　指定保育士養成施設　こども學舎</span></div>';
            insert+='<div class="last_text_b"><span>施設長　　　　　河村　敦子　　　　　　　</span><span>（平成25年3月8日　北海厚発0308第5号）</span><div><img width="90" height="90" src="https://lh3.google.com/u/0/d/0B2rk3X5Ek1qKNzh4Z0lCUFU0U2c=w1920-h857-iv1"></div></div>';
            insert += '</div></div>';
          }

          $(insert).appendTo($('.preview'));

   }

   // Read in the image file as a data URL.
   reader.readAsText(files);
//  }
}
function date(str) {
    var date = str.match(/(\d+).(\d+).(\d+)/);
    var newDate = yearF(date[1])+"　"+String(afterYear(date[2]))+"月"+String(afterYear(date[3]))+"日";
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
