montageDefine("60ecd96","http-apps/fs",{dependencies:["q","url2","mime","../fs","./status","./redirect","./negotiate","./html","../deprecate"],factory:function(e,t){var n=e("q"),i=e("url2"),r=e("mime"),a=e("../fs"),s=e("./status"),o=e("./redirect"),l=e("./negotiate"),c=e("./html"),u=e("../deprecate");t.File=function(e,n){return function(i){return t.file(i,e+"",n)}},t.FileTree=function(e,r){r||(r={}),r.notFound=r.notFound||s.notFound,r.file=r.file||t.file,r.directory=r.directory||t.directory,r.fs=r.fs||a;var l=r.fs;return e=l.canonical(e),function(t,a){i.parse(t.url),t.fs=l;var s=r.redirect||(t.permanent||r.permanent?o.permanentRedirect:o.temporaryRedirect);return n.when(e,function(e){var i=l.join(e,t.pathInfo.slice(1));return n.when(l.canonical(i),function(o){return r.followInsecureSymlinks&&(u.deprecationWarning("followInsecureSymlinks","followInsecureSymbolicLinks"),r.followInsecureSymbolicLinks=!0),l.contains(e,o)||r.followInsecureSymbolicLinks?i!==o&&r.redirectSymbolicLinks?s(t,l.relativeFromFile(i,o)):n.when(l.stat(o),function(e){return e.isFile()?r.file(t,o,r.contentType,l):e.isDirectory()?r.directory(t,o,r.contentType,l):r.notFound(t,a)}):r.notFound(t,a)},function(){return r.notFound(t,a)})})}},t.file=function(e,i,o,l){return l=l||a,o=o||r.lookup(i),n.when(l.stat(i),function(n){var r,a=t.etag(n),c={flags:"rb"},u=200,h={"content-type":o,etag:a};if("range"in e.headers)if("if-range"in e.headers&&a!=e.headers["if-range"]);else{if(r=f(e.headers.range,n.size),!r)return s.responseForStatus(e,416);if(r.end>n.size&&(r.end=n.size),r.end<=r.begin)return s.responseForStatus(e,416);u=206,h["content-range"]="bytes "+r.begin+"-"+(r.end-1)+"/"+n.size,h["content-length"]=""+(r.end-r.begin),c.begin=r.begin,c.end=r.end}else{if(a==e.headers["if-none-match"])return s.responseForStatus(e,304);h["content-length"]=""+n.size}return{status:u,headers:h,body:l.open(i,c),file:i,range:r}})};var h=/^\s*bytes\s*=\s*(\d*\s*-\s*\d*\s*(?:,\s*\d*\s*-\s*\d*\s*)*)$/,d=/^\s*(\d*)\s*-\s*(\d*)\s*$/,p=function(e,t){var n=d.exec(e);if(n&&(""!=n[1]||""!=n[2])){var i,r;return""==n[1]?(i=0,r=+n[2]+1):""==n[2]?(i=+n[1],r=t):(i=+n[1],r=+n[2]+1),{begin:i,end:r}}},f=t.interpretFirstRange=function(e,t){var n=h.exec(e);if(n){for(var i=n[1].split(/\s*,\s*/),r=p(i[0],t),a=0,s=i.length;s>a;a++){var o=p(i[a],t);if(!(o.begin<=r.end))return;r.end=o.end}return r}};t.etag=function(e){return[e.node.ino,e.size,e.lastModified().getTime()].join("-")},t.directory=function(e,t){var n=s.notFound(e);return n.directory=t,n},t.ListDirectories=function(e,i){return i=i||t.listDirectory,function(t){if(t.directoryIndex)throw Error("DirectoryIndex must be used after ListDirectories");return t.listDirectories=!0,n.fcall(e,t).then(function(e){return void 0!==e.directory?i(t,e):e})}},t.listDirectory=function(e,n){if(e.location=i.parse(e.path),e.location.file)return o.redirect(e,e.location.file+"/");var r={};r["text/plain"]=t.listDirectoryText,r["text/markdown"]=t.listDirectoryMarkdown,e.handleHtmlFragmentResponse&&(r["text/html"]=t.listDirectoryHtmlFragment),e.handleJsonResponse&&(r["application/json"]=t.listDirectoryJson);var a=l.negotiate(e,r)||function(){return n};return a(e,n)},t.listDirectoryHtmlFragment=function(e,n){return t.listDirectoryData(e,n).then(function(e){return{status:200,headers:{"content-type":"text/html"},htmlTitle:"Directory Index",htmlFragment:{forEach:function(t){t('<ul class="directory-index">\n'),Object.keys(e).sort().forEach(function(n){var i=e[n],r="";"directory"===i.type&&(r="/"),t('    <li class="entry '+i.type+'"><a href="'+c.escapeHtml(n+r)+'">'+c.escapeHtml(n+r)+"</a></li>\n")}),t("</ul>\n")}}}})},t.listDirectoryText=function(e,n){return t.listDirectoryData(e,n).then(function(e){return{status:200,headers:{"content-type":"text/plain"},body:{forEach:function(t){Object.keys(e).sort().forEach(function(n){var i=e[n],r="";"directory"===i.type&&(r="/"),t(n+r+"\n")})}}}})},t.listDirectoryMarkdown=function(e,n){return t.listDirectoryData(e,n).then(function(e){return{status:200,headers:{"content-type":"text/plain"},body:{forEach:function(t){t("\n# Directory Index\n\n"),Object.keys(e).forEach(function(n){var i=e[n],r="";"directory"===i.type&&(r="/"),t("-   "+n+r+"\n")}),t("\n")}}}})},t.listDirectoryJson=function(e,n){return t.listDirectoryData(e,n).then(function(e){return{status:200,headers:{},data:e}})},t.listDirectoryData=function(e,t){if(!e.fs)throw Error("Can't list a directory without a designated file system");var i=e.fs;return n.invoke(i,"list",t.directory).then(function(e){return e.sort(),e.map(function(e){return n.invoke(i,"stat",i.join(t.directory,e)).then(function(t){return t.isDirectory()?{name:e,stat:{type:"directory"}}:t.isFile()?{name:e,stat:{type:"file"}}:void 0},function(){})})}).all().then(function(e){var t={};return e.forEach(function(e){e&&(t[e.name]=e.stat)}),t})},t.DirectoryIndex=function(e,t){return t=t||"index.html",function(r){return r.directoryIndex=!0,r.location=i.parse(r.path),r.location.file===t?o.redirect(r,"."):n.fcall(e,r).then(function(a){if(void 0!==a.directory){if(r.location.file)return o.redirect(r,r.location.file+"/");var s=r.fs.join(a.directory,t);return n.invoke(r.fs,"isFile",s).then(function(n){return n?(r.url=i.resolve(r.url,t),r.pathInfo+=t,e(r)):a})}return a})}}}});