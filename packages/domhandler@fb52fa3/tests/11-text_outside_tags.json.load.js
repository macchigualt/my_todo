montageDefine("fb52fa3","tests/11-text_outside_tags.json",{exports:{name:"Text outside tags",options:{handler:{},parser:{}},html:"Line one\n<br>\nline two",expected:[{data:"Line one\n",type:"text"},{type:"tag",name:"br",attribs:{}},{data:"\nline two",type:"text"}]}});