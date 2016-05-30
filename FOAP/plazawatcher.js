
var chokidar = require('chokidar');
var util = require('util');
var fs = require("fs");
var paths = require('path');
function EncodeUtf8(s1)
  {
      var s = escape(s1); // 输出unicode编码的字符
      var sa = s.split("%");
      var retV ="";
      if(sa[0] != "")
      {
         retV = sa[0];
      }
      for(var i = 1; i < sa.length; i ++)
      {
           if(sa[i].substring(0,1) == "u")
           {
               retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));

           }
           else retV += "%" + sa[i];
      }

      return retV;
  }
  function Str2Hex(s)
  {
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++)
      {
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += Dec2Dig(eval(n));

      }
      //return value;
      return digS;
  }
  function Dec2Dig(n1)
  {
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++)
      {
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2)
         {
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';

      }
      return s;

  }
  function Dig2Dec(s)
  {
      var retV = 0;
      if(s.length == 4)
      {
          for(var i = 0; i < 4; i ++)
          {
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
  }
  function Hex2Utf8(s)
  {
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16)
     {
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10);
         tempS += "10" + s.substring(10,16);
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++)
         {
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);



            retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
  };
function creatIndexhtml(iconpath,appName,urlScheme,plazaId){
  console.log('找到icon.png,在同路径下生成index.html   '+iconpath);

  var base64,prefix;
  fs.readFile(iconpath, function(err, data) {
    // console.log(data);
    if(err){
      return console.error(err);
    }
      base64 = data.toString('base64');
      var htmlStr = '<html><head>';
      htmlStr = htmlStr.concat("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">");
      var taragerUrl = "0;url=data:text/html;charset=UTF-8,<html><head><meta content=\"yes\" name=\"apple-mobile-web-app-capable\" /><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\" /><title>"+appName+"</title></head><body bgcolor=\"#ffffff\">";

      var htmlUrlScheme = "<a href=\""+urlScheme;

      var dataUrlStr = "?plazaId="+plazaId+"&name="+appName +  "\" id=\"qbt\" style=\"display: none;\"></a>";

      var imageUrlStr = "<span id=\"msg\"></span></body><script>if (window.navigator.standalone == true) {    var lnk = document.getElementById(\"qbt\");    var evt = document.createEvent('MouseEvent');    evt.initMouseEvent('click');    lnk.dispatchEvent(evt);}else{    var addObj=document.createElement(\"link\");    addObj.setAttribute('rel','apple-touch-icon-precomposed');    addObj.setAttribute('href','data:image/png;base64,"+base64+"');";

      var lastHtmlStr = "document.getElementsByTagName(\"head\")[0].appendChild(addObj);    document.getElementById(\"msg\").innerHTML='<div style=\"font-size:12px;\">点击页面下方的 + 或 <img id=\"i\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTU1NEJDMzMwQTBFMTFFM0FDQTA4REMyNUE4RkExNkEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTU1NEJDMzQwQTBFMTFFM0FDQTA4REMyNUE4RkExNkEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0QkMzMTBBMEUxMUUzQUNBMDhEQzI1QThGQTE2QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NTU0QkMzMjBBMEUxMUUzQUNBMDhEQzI1QThGQTE2QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlMy2ugAAAAbUExUReXy/yaS/4nE/67W//n8/+n0/0yl/wB//////1m3cVcAAAAJdFJOU///////////AFNPeBIAAABDSURBVHjaxNA7DgAgCAPQoiLc/8T+EgV1p0ubxwb0E+xR8SBICBcyJUnEHktW0VwOykivvSaus6kA1CD0sZ+3aQIMAJIgC+S9X9jmAAAAAElFTkSuQmCC\"> 按钮，在弹出的菜单中选择［添加至主屏幕］，即可将选定的功能添加到主屏幕作为快捷方式。</div>';}</script></html>";

      taragerUrl =  taragerUrl.concat(htmlUrlScheme);
      taragerUrl = taragerUrl.concat(dataUrlStr);

      var dataUrlEncode = encodeURI(taragerUrl);
      var imageUrlEncode = encodeURI(imageUrlStr);
      var lastHtmlStrEncode = encodeURI(lastHtmlStr);
      htmlStr = htmlStr.concat("<meta http-equiv=\"REFRESH\" content=\""+dataUrlEncode+imageUrlEncode+lastHtmlStrEncode + "\">");
      htmlStr = htmlStr.concat("</head></html>");
      var htmlpath = iconpath.replace('icon.png','addapp.html');
      // htmlStr = EncodeUtf8(htmlStr);
      fs.writeFile(htmlpath,htmlStr, function(err){
        console.log('写入成功');
      });

  });
  // TODO addapp
}

// One-liner for current directory, ignores .dotfiles
chokidar.watch('.', {ignored: /[\/\\]\./}).on('all', (event, path) => {
  console.log(event, path);
  if ((event == 'add' || event == 'change') && (path.indexOf('./plazasjs/icon.png')>0||path.indexOf('./plazasjs/appconfig.json') > 0)) {
      console.log("testtest****");
      console.log(path);
    creatRes(path);
  }
  if ((event == 'add' || event == 'change'|| event == 'unlink') && (path.indexOf('Component/FF')>=0||path.indexOf('Component/UF') >= 0)) {
    console.log('组件变化：'+path);
    creatstylelist(path);
    creatstylelistByPath(path);
  }
});
function creatstylelist(path){
  var name = paths.basename(path);
    console.log("*(*(*(");
    console.log(name);
  var names = name.split('_');
  if(names.length < 3){
    return;
  }

  var dirName = paths.dirname(path).split('/');
  var absoluteDir = './'+dirName[0];
    console.log(absoluteDir);
  var strlist = `\'use strict\';
export type plazaCell = {
  key: string;
  module: Object;
};
var CellArray: Array<plazaCell> = [`;
  // 遍历类型文件夹，生成plazalist.js文件。
  fs.readdir(absoluteDir,function(err,files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (folder,index) {
      if (folder.split('_').length == 2) {
        strlist += lookForStyleJS(absoluteDir, folder);
      }
    });
    // 临时用于调试所用
    strlist +='{\r\nkey:\"'+'UF_AppChoice_0'+'\",\r\nmodule:require(\'..\/'+'..\/FOAP\/Component\/UF_AppChoice\/UF_AppChoice_0'+'\')\r\n},\r\n'
   //结束
    strlist += `];
const plazaCells = {};
CellArray.forEach(cell => {
  plazaCells[cell.key] = cell.module;
});

const stylelist = {
  plazaCells,
}
module.exports = stylelist;`;

    //strlist += '];\r\n const plazaCells = {};\r\nCellArray.forEach(cell => {\r\nplazaCells[cell.key] = cell.module;\r\n});\r\nconst stylelist = {\r\nplazaCells,}\r\nmodule.exports = stylelist;';
    //console.log(strlist);
    // 写文件
    fs.writeFile('./Component/stylelist.js', strlist,  function(err) {
      if (err) {
         return console.error(err);
       }
    });
  });
};
function lookForStyleJS(path, folder) {
  var strlist = '';
  var tempPath = path+'/'+folder;
  var stats = fs.lstatSync(tempPath);
  if (stats.isDirectory()) {
    var readSubDir = fs.readdirSync(tempPath);
    readSubDir.forEach(function(file,index) {
      // 按照命名区分类型
      var names  = file.split('_');
      // 满足规则的才加入list
      var fileExtends = file.split('.');
      if(names.length == 3 && fileExtends.length > 1 && fileExtends[fileExtends.length - 1] == 'js'){
        strlist += '{\r\nkey:\"'+file.replace('.js','')+'\",\r\nmodule:require(\'.\/'+folder+'/'+file.replace('.js','')+'\')\r\n},\r\n';
      }
    });
  }
  return strlist;
};
function creatRes(path){
  var pp = "";
  if(path.indexOf('icon.png')>0){
    pp = path.replace("/icon.png","");
    console.log('icon path:'+pp);

  };
  if(path.indexOf('appconfig.json')>0){
    pp = path.replace('/appconfig.json','');
    console.log(pp);

  }

  var configpath = pp+'/appconfig.json';
  var iconpath = pp+'/icon.png'
  var pid = pp;
  console.log(iconpath + configpath+pid);

  // 两个文件都存在才去生成addapp.htmlpath
  fs.stat(iconpath,function(err,sta){
    console.log(err);
    if(err==null){
      fs.stat(configpath,function(err,stat){
        if(err==null){
          var dic = JSON.parse(fs.readFileSync(configpath));
            console.log('开始生成addapp.html'+path+dic.name+pid);
            creatIndexhtml(iconpath,dic.name,"wandafeifanapp://plazas",pid);
        }
      });
    }
  });
};

function creatstylelistByPath(path){

  var name = path.replace('Component/','');
  var names = name.split('_');
  if(names.length < 3){
    return;
  }
  // 遍历类型文件夹，生成plazalist.js文件。
  var styles = './Component';
  var dic = {};
  fs.readdir(styles,function(err,files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (file,index)
    {
      // 按照命名区分类型
      // console.log("*&*&&");
      // console.log(file);
      var str = styles+"/"+file;
      var stat = fs.lstatSync(str);
      var subArray = [];

      if (stat.isDirectory())
      {
        var readSubDir = fs.readdirSync(str);
        for (var i = 0; i < readSubDir.length; i++)
        {
          var subfile = readSubDir[i];
          var searchNum = subfile.indexOf(".json");
          if (searchNum != -1)
          {
            var data = fs.readFileSync(str+'/'+subfile,"utf-8");
            var json = JSON.parse(data);
              subArray.push(json);
          }
        }
        dic[file] = subArray;
      }
    });
    var jsonString = JSON.stringify(dic)
    console.log('jsonString='+jsonString);
    // 写文件
    fs.writeFile('./Component/stylelist.json', jsonString,  function(err) {
       if (err) {
           return console.error(err);
       }
    });
  });
};
