import{d as Z,e as Y,N as ee,A as te,y as T,O as le,o as d,c as v,Q as S,R as ae,v as t,i as e,w as l,k as L,F as ue,C as oe,J as m,z as s,S as x,K as E,j as C,t as c,T as ne,U as N,E as se,f as re,V as ie,W as de,g as pe,h as ce,G as _e,H as me,X as fe,$ as Fe,Z as ge,a1 as Ee,a2 as be,an as ve}from"./index.06298527.js";/* empty css                   *//* empty css                        *//* empty css               */import{c as ke,e as he,f as we}from"./index.38095e8f.js";import{a as U}from"./date.1b7b5119.js";const ye={class:"app-container"},Ce={class:"create-time"},Be={style:{"margin-left":"10px"}},De={key:0},Ae={key:1},Ve={class:"dialog-footer"},Ke=Z({__name:"task",setup(Te){const G=Y({count:0,open:!1,showSearch:!0,loading:!1,queryParams:{current:1,size:10},status:[{value:0,label:"\u5931\u8D25"},{value:1,label:"\u6210\u529F"}],logIdList:[],logList:[],taskForm:{}}),{count:k,open:f,showSearch:b,loading:h,queryParams:o,status:I,logIdList:w,logList:B,taskForm:r}=ee(G),K=n=>{r.value=n,f.value=!0},R=n=>{w.value=n.map(u=>u.id)},$=n=>{let u=[];n==null?u=w.value:u=[n],ne("\u786E\u8BA4\u5220\u9664\u5DF2\u9009\u4E2D\u7684\u6570\u636E\u9879?").then(()=>{ke(u).then(({data:F})=>{F.flag&&(N(F.msg),_())})}).catch(()=>{})},z=()=>{he().then(({data:n})=>{n.flag&&(N(n.msg),_())})},_=()=>{h.value=!0,we(o.value).then(({data:n})=>{B.value=n.data.recordList,k.value=n.data.count,h.value=!1})},y=()=>{o.value.current=1,_()};return te(()=>{_()}),(n,u)=>{const F=se,i=re,j=ie,q=de,g=pe,D=ce,A=_e,M=T("right-toolbar"),P=me,p=fe,V=Fe,Q=T("clock"),O=ge,H=Ee,J=be,W=ve,X=le;return d(),v("div",ye,[S(e(D,{ref:"queryFormRef",model:t(o),inline:!0},{default:l(()=>[e(i,{label:"\u4EFB\u52A1\u540D\u79F0",prop:"jobName"},{default:l(()=>[e(F,{modelValue:t(o).keyword,"onUpdate:modelValue":u[0]||(u[0]=a=>t(o).keyword=a),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0",clearable:"",onKeyup:L(y,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(i,{label:"\u4EFB\u52A1\u7EC4\u540D",prop:"jobGroup"},{default:l(()=>[e(F,{modelValue:t(o).taskGroup,"onUpdate:modelValue":u[1]||(u[1]=a=>t(o).taskGroup=a),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u7EC4\u540D",clearable:"",onKeyup:L(y,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(i,{label:"\u4EFB\u52A1\u72B6\u6001",prop:"status"},{default:l(()=>[e(q,{modelValue:t(o).status,"onUpdate:modelValue":u[2]||(u[2]=a=>t(o).status=a),placeholder:"\u4EFB\u52A1\u72B6\u6001",clearable:"",style:{width:"200px"}},{default:l(()=>[(d(!0),v(ue,null,oe(t(I),a=>(d(),m(j,{key:a.value,label:a.label,value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(i,null,{default:l(()=>[e(g,{type:"primary",icon:"Search",onClick:y},{default:l(()=>[s("\u641C\u7D22")]),_:1})]),_:1})]),_:1},8,["model"]),[[ae,t(b)]]),e(P,{gutter:10,class:"mb15"},{default:l(()=>[e(A,{span:1.5},{default:l(()=>[e(g,{type:"danger",plain:"",disabled:t(w).length===0,icon:"Delete",onClick:u[3]||(u[3]=a=>$(void 0))},{default:l(()=>[s("\u6279\u91CF\u5220\u9664")]),_:1},8,["disabled"])]),_:1},8,["span"]),e(A,{span:1.5},{default:l(()=>[e(g,{type:"danger",plain:"",icon:"Delete",onClick:z},{default:l(()=>[s("\u6E05\u7A7A\u65E5\u5FD7")]),_:1})]),_:1},8,["span"]),e(M,{showSearch:t(b),"onUpdate:showSearch":u[4]||(u[4]=a=>x(b)?b.value=a:null),onQueryTable:_},null,8,["showSearch"])]),_:1}),S((d(),m(H,{border:"",data:t(B),onSelectionChange:R},{default:l(()=>[e(p,{type:"selection",width:"55",align:"center"}),e(p,{label:"\u4EFB\u52A1\u540D\u79F0",width:"160",align:"center",prop:"taskName","show-overflow-tooltip":!0}),e(p,{label:"\u4EFB\u52A1\u7EC4\u540D",width:"140",align:"center",prop:"taskGroup"}),e(p,{label:"\u8C03\u7528\u76EE\u6807",width:"150",align:"center",prop:"invokeTarget","show-overflow-tooltip":!0}),e(p,{label:"\u65E5\u5FD7\u4FE1\u606F",align:"center",prop:"taskMessage","show-overflow-tooltip":!0}),e(p,{label:"\u72B6\u6001",align:"center",width:"100"},{default:l(a=>[a.row.status==1?(d(),m(V,{key:0,type:"success"},{default:l(()=>[s("\u6210\u529F")]),_:1})):E("",!0),a.row.status==0?(d(),m(V,{key:1,type:"danger"},{default:l(()=>[s("\u5931\u8D25")]),_:1})):E("",!0)]),_:1}),e(p,{label:"\u6267\u884C\u65F6\u95F4",align:"center",width:"180"},{default:l(a=>[C("div",Ce,[e(O,null,{default:l(()=>[e(Q)]),_:1}),C("span",Be,c(t(U)(a.row.createTime)),1)])]),_:1}),e(p,{label:"\u64CD\u4F5C",align:"center",width:"120"},{default:l(a=>[e(g,{type:"primary",icon:"View",link:"",onClick:Se=>K(a.row)},{default:l(()=>[s("\u8BE6\u7EC6")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[X,t(h)]]),t(k)>0?(d(),m(J,{key:0,total:t(k),page:t(o).current,"onUpdate:page":u[5]||(u[5]=a=>t(o).current=a),limit:t(o).size,"onUpdate:limit":u[6]||(u[6]=a=>t(o).size=a),onPagination:_},null,8,["total","page","limit"])):E("",!0),e(W,{title:"\u4EFB\u52A1\u65E5\u5FD7\u8BE6\u7EC6",modelValue:t(f),"onUpdate:modelValue":u[8]||(u[8]=a=>x(f)?f.value=a:null),width:"700px","append-to-body":""},{footer:l(()=>[C("div",Ve,[e(g,{onClick:u[7]||(u[7]=a=>f.value=!1)},{default:l(()=>[s("\u5173 \u95ED")]),_:1})])]),default:l(()=>[e(D,{model:t(r),"label-width":"100px"},{default:l(()=>[e(i,{label:"\u4EFB\u52A1\u540D\u79F0\uFF1A"},{default:l(()=>[s(c(t(r).taskName),1)]),_:1}),e(i,{label:"\u4EFB\u52A1\u5206\u7EC4\uFF1A"},{default:l(()=>[s(c(t(r).taskGroup),1)]),_:1}),e(i,{label:"\u8C03\u7528\u65B9\u6CD5\uFF1A"},{default:l(()=>[s(c(t(r).invokeTarget),1)]),_:1}),e(i,{label:"\u65E5\u5FD7\u4FE1\u606F\uFF1A"},{default:l(()=>[s(c(t(r).taskMessage),1)]),_:1}),e(i,{label:"\u6267\u884C\u65F6\u95F4\uFF1A"},{default:l(()=>[s(c(t(U)(t(r).createTime)),1)]),_:1}),e(i,{label:"\u6267\u884C\u72B6\u6001\uFF1A"},{default:l(()=>[t(r).status==1?(d(),v("div",De,"\u6210\u529F")):t(r).status==0?(d(),v("div",Ae,"\u5931\u8D25")):E("",!0)]),_:1}),t(r).status==0?(d(),m(i,{key:0,label:"\u9519\u8BEF\u4FE1\u606F\uFF1A"},{default:l(()=>[s(c(t(r).errorInfo),1)]),_:1})):E("",!0)]),_:1},8,["model"])]),_:1},8,["modelValue"])])}}});export{Ke as default};
