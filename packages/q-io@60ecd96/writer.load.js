montageDefine("60ecd96","writer",{dependencies:["q"],factory:function(e,t,n){function i(e,t){var n=Object.create(i.prototype);t&&e.setEncoding&&e.setEncoding(t);var a=r.defer();return e.on("error",function(e){a.reject(e),a=r.defer()}),e.on("drain",function(){a.resolve(),a=r.defer()}),n.write=function(t){return e.writeable||e.writable?("string"!=typeof t&&(t=new Buffer(t)),e.write(t)?r.resolve():a.promise):r.reject(Error("Can't write to non-writable (possibly closed) stream"))},n.flush=function(){return a.promise},n.close=function(){var t;return s&&(t=r.defer(),e.on("finish",function(){t.resolve()}),e.on("error",function(e){t.reject(e)})),e.end(),a.resolve(),t?t.promise:r()},n.destroy=function(){return e.destroy(),a.resolve(),r.resolve()},n.node=e,r(n)}var r=e("q");n.exports=i;var a=process.versions.node.split("."),s=a[0]>=0&&a[1]>=10}});