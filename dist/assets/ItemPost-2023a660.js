import{u as le,j as e,G as v,a as re,R as ie,t as de,r as n,b as R,c as xe,s as r,d as me,A as he,F as fe,e as pe,f as l,g as D}from"./index-7ad321e9.js";const ue=()=>{const o=le(h=>h.opition.mode);return e.jsxs("div",{children:[o&&e.jsx("div",{}),!o&&e.jsxs("div",{className:" absolute z-10 bottom-[200px]  left-[600px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[10px] p-[10px]",children:[e.jsx("div",{className:"cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]",style:{width:450,height:50,alignItems:"center",justifyContent:"center",paddingLeft:20,marginBottom:10,paddingRight:20},children:e.jsx("p",{className:"mx-auto  center",style:{fontSize:15,color:"black",fontStyle:"bold",marginLeft:20},children:"Cài đặt"})}),e.jsx("div",{className:"cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]",style:{width:450,height:50,alignItems:"center",justifyContent:"center",paddingLeft:20,marginBottom:10,paddingRight:20},children:e.jsx("p",{className:"mx-auto  center",style:{fontSize:15,color:"black",fontStyle:"bold",marginLeft:20},children:"Cài đặt"})}),e.jsx("div",{className:"cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]",style:{width:450,height:50,alignItems:"center",justifyContent:"center",paddingLeft:20,marginBottom:10,paddingRight:20},children:e.jsx("p",{className:"mx-auto  center",style:{fontSize:15,color:"black",fontStyle:"bold",marginLeft:20},children:"Cài đặt"})}),e.jsx("div",{className:"cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]",style:{width:450,height:50,alignItems:"center",justifyContent:"center",paddingLeft:20,marginBottom:10,paddingRight:20},children:e.jsx("p",{className:"mx-auto  center",style:{fontSize:15,color:"black",fontStyle:"bold",marginLeft:20},children:"Cài đặt"})}),e.jsx("div",{className:"cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]",style:{width:450,height:50,alignItems:"center",justifyContent:"center",paddingLeft:20,marginBottom:10,paddingRight:20},children:e.jsx("p",{className:"mx-auto  center",style:{fontSize:15,color:"black",fontStyle:"bold",marginLeft:20},children:"Cài đặt"})}),e.jsx("div",{className:"cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]",style:{width:450,height:50,alignItems:"center",justifyContent:"center",paddingLeft:20,marginBottom:10,paddingRight:20},children:e.jsx("p",{className:"mx-auto  center",style:{fontSize:15,color:"black",fontStyle:"bold",marginLeft:20},children:"Cài đặt"})}),e.jsx("div",{className:"cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]",style:{width:450,height:50,alignItems:"center",justifyContent:"center",paddingLeft:20,marginBottom:10,paddingRight:20},children:e.jsx("p",{className:"mx-auto  center",style:{fontSize:15,color:"black",fontStyle:"bold",marginLeft:20},children:"Cài đặt"})})]})]})};function z(o){return v({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"}}]})(o)}function ge(o){return v({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M352 56h-1c-39.7 0-74.8 21-95 52-20.2-31-55.3-52-95-52h-1c-61.9.6-112 50.9-112 113 0 37 16.2 89.5 47.8 132.7C156 384 256 456 256 456s100-72 160.2-154.3C447.8 258.5 464 206 464 169c0-62.1-50.1-112.4-112-113z"}}]})(o)}function je(o){return v({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m22 2-7 20-4-9-9-4Z"}},{tag:"path",attr:{d:"M22 2 11 13"}}]})(o)}const ve=({content1:o,imgg:h,id:i,idPost:d,countLike:_=0,islike:B})=>{const y=re(),c=ie(de),[E,O]=n.useState(""),[w,T]=n.useState(""),[U,M]=n.useState(""),[$,A]=n.useState(""),[j,f]=n.useState(""),[F,P]=R(xe),[G,H]=n.useState({data:[],success:!1,message:""}),[Ne,X]=n.useState({dataUser:[],success:!1,message:""}),[J,W]=n.useState(""),[V,k]=n.useState(!0);n.useEffect(()=>{r(c),(async()=>{try{const s=N=>{const b=N.replace("-","+").replace("_","/");return atob(b)},a=N=>{const[b,ae,ne]=N.split("."),oe=JSON.parse(s(b)),ce=JSON.parse(s(ae));return{header:oe,payload:ce,signature:ne}},m=localStorage.getItem("token"),se=a(m).payload.id,L=await l.get(`http://www.socialnetwork.somee.com/api/infor/user/${se}`);console.log(L),M(L.data.data.userId)}catch(s){console.error("Get post failed",s)}})()},[c]),n.useEffect(()=>{r(c),(async()=>{try{const s=await l.get(`http://www.socialnetwork.somee.com/api/infor/user/${i}`);console.log(s),O(s.data.data.image),A(s.data.data.fullName),T(s.data.data.userId)}catch(s){console.error("Get post failed",s)}})()},[c]);const Z=async()=>{r(c);try{const t=d;await l.post(`http://www.socialnetwork.somee.com/api/like/${t}`).then(s=>{s.status===200&&P(F+1)}).catch(s=>{console.log(s)})}catch(t){console.error("Login failed",t)}},p=async()=>{const t=d;await l.get(`http://www.socialnetwork.somee.com/api/cmt/getcmtPost/${t}`).then(s=>{s.status===200&&(console.log(s.data),H(s.data))}).catch(s=>{console.error("Error fetching data:",s)})},u=async()=>{await l.get(`http://www.socialnetwork.somee.com/api/infor/user/${i}`).then(t=>{t.status===200&&(X(t.data),console.log(t))}).catch(t=>{console.error("Error fetching data:",t)})};console.log(i);const[q,K]=R(me),Q=async()=>{r(c),console.log(i);const t=await l.delete(`http://www.socialnetwork.somee.com/api/post/${d}`);console.log(t),t.status===204&&K(q+1)},Y=async()=>{r(c);const t=d,s=i;return f(""),l.post(D.POST_COMMENT,{content:j,postId:t,userId:s}).then(a=>{a.status===200&&(p(),u())}).catch(a=>console.log(a))},C=async t=>{r(c);const s=d,a=i,m=t;return l.post(D.POST_COMMENT,{content:j,postId:s,userId:a,parentId:m}).then(g=>{g.status===200&&(p(),u(),f(""))}).catch(g=>console.log(g))},S=async t=>{r(c);const s=t;return l.post(`http://www.socialnetwork.somee.com/api/cmt/deleteOrUndo/${s}`).then(a=>{a.status===200&&(p(),u(),f(""))}).catch(a=>console.log(a))},[x,I]=n.useState(2),ee=()=>{I(x+2)},te=()=>{I(2)};return n.useEffect(()=>{p(),u()},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"h-[fit-content] w-[55%] pb-3  ml-[35%] mt-[50px] flex justify-center items-center",children:e.jsxs("div",{className:"w-[80%] border-solid border-b-[1px] border-[#cfcfcf] ",children:[e.jsxs("div",{className:"h-[10%] flex justify-between  items-center",children:[e.jsxs("div",{className:"flex justify-center pl-3 items-center",onClick:()=>{w==U?y("/inforuser"):y(`/info-friend/${w}`)},children:[e.jsx("img",{src:E,className:"h-10 w-10 cursor-pointer rounded-full",alt:""}),e.jsx("div",{className:"ml-3 cursor-pointer",children:e.jsxs("div",{className:"flex flex-col justify-start items-start",children:[e.jsx("p",{className:"text-[16px]",children:$}),e.jsx("p",{className:"text-[#a3a3a3] text-[13px] ",children:"2 day"})]})})]}),e.jsx("p",{className:"text-[20px] font-semibold pr-3 cursor-pointer",onClick:Q,children:e.jsx(z,{})})]}),e.jsx("div",{className:" h-[70%] w-full mt-4",children:e.jsx("img",{src:h,alt:"",className:"h-full w-full rounded-[15px]",onClick:()=>{W(h),k(!1)}})}),e.jsxs("div",{className:"h-[20%] w-full mb-2",children:[e.jsx("div",{className:"w-full flex justify-between",children:e.jsxs("div",{className:"flex pt-3",children:[e.jsx("div",{className:"text-[22px] mx-2 cursor-pointer hover:text-[#a3a3a3]",onClick:Z,children:B==!1?e.jsx(he,{color:"black"}):e.jsx(ge,{color:"pink"})}),e.jsxs("div",{className:"text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]",children:[" ",e.jsx(fe,{})," "]}),e.jsxs("div",{className:"text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]",children:[" ",e.jsx(je,{})]})]})}),e.jsx("div",{className:"flex justify-start my-2 ml-1",children:e.jsxs("p",{className:"text-[15px] font-bold",children:[_," lượt thích"]})}),e.jsx("div",{className:"flex justify-start my-2 ml-1 items-center",children:e.jsxs("p",{className:"text-[20px] ml-1",children:[" ",o]})}),e.jsxs("div",{className:"flex mb-6",children:[e.jsx("input",{onChange:t=>{f(t.target.value)},type:"text",placeholder:"Thêm bình luận...",className:" w-[90%] h-[80%] pl-2 text-[19px] outline-none"}),j===""?e.jsx(e.Fragment,{}):e.jsx("div",{className:"cursor-pointer ml-2",onClick:Y,children:e.jsx(pe,{color:"#ff7f50"})})]}),e.jsx("div",{className:"block",children:G.data.map((t,s)=>e.jsxs("div",{className:"flex items-start mb-4",children:[e.jsx("div",{className:"flex-shrink-0 mr-2",children:e.jsx("img",{src:t.image,alt:"User Avatar",className:"w-8 h-8 rounded-full"})}),e.jsxs("div",{className:"flex flex-col flex-grow",children:[e.jsxs("div",{className:"flex justify-between items-center mb-1",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("p",{className:"text-[18px] text-black font-semibold mb-0 mr-1",children:t.fullName}),e.jsx("span",{className:"text-[12px] text-gray-500",children:t.userHandle}),e.jsx("p",{className:"text-[18px] text-black cursor-pointer",children:t.content})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[12px] text-black cursor-pointer",onClick:()=>C(t.id),children:"Phản hồi"}),e.jsx("span",{className:"text-[12px] text-black cursor-pointer ml-2",onClick:()=>S(t.id),children:"Xóa"})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("p",{className:"text-[20px] text-black cursor-pointer",children:t.replyContent})}),e.jsxs("div",{className:"flex flex-col",children:[t.childrenComment.slice(0,x).map((a,m)=>e.jsxs("div",{className:"flex justify-between mb-2 border-solid border-l-[1px] border-[#cfcfcf] ",style:{height:"auto"},children:[e.jsxs("div",{className:"flex h-auto",children:[" ",e.jsx("img",{src:a.image,alt:"User Avatar",className:"w-6 h-6 rounded-full mr-2 ml-2"}),e.jsxs("div",{className:"flex items-center mb-1",children:[e.jsx("span",{className:"text-[15px] text-black font-semibold mr-2",children:a.fullName}),e.jsx("span",{className:"text-[15px] text-black flex-grow",style:{maxWidth:"100px"},children:a.content+""})]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-[12px] text-black cursor-pointer",onClick:()=>C(t.id),children:"Phản hồi"}),e.jsx("span",{className:"text-[12px] text-black cursor-pointer ml-2",onClick:()=>S(a.id),children:"Xóa"})]})]},m)),t.childrenComment.length>x&&e.jsx("div",{className:"text-[12px] text-black cursor-pointer",onClick:ee,children:"Xem thêm"}),t.childrenComment.length<x&&x>2&&e.jsx("div",{className:"text-[12px] text-black cursor-pointer",onClick:te,children:"Ẩn đi"})]})]})]},s))})]}),e.jsx(ue,{})]})}),!V&&e.jsxs("div",{style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",background:"rgba(0, 0, 0, 0.5)",width:"100%",height:"100%",zIndex:999,display:"flex",justifyContent:"center",alignItems:"center"},children:[e.jsx("img",{src:J,alt:"",className:"h-[70vh]"}),e.jsx("div",{className:"absolute top-5 right-5 text-[30px] cursor-pointer",children:e.jsx(z,{onClick:()=>{k(!0)}})})]})]})};export{ve as default};