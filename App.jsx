import {useState} from "react";
import {Link,NavLink,Navigate,Route,Routes,useNavigate,useParams} from "react-router-dom";
import {Zap,Menu,X,BatteryCharging,PlugZap,Wrench,Car,Navigation,MapPin,Search,Crosshair,ChevronRight,ArrowLeft,User,Bell,Settings,History,CircleHelp,LogOut,ShieldCheck,Clock3,LocateFixed,CheckCircle2} from "lucide-react";
import api from "./api";
import "./App.css";

const stations=[
 {id:1,name:"Sai EV Charging Station",rating:4.5,reviews:24,distance:"1.2 km",type:"DC Fast Charger",power:"50 kW",address:"Pune - Nashik Highway, Pune"},
 {id:2,name:"GreenCharge Hub",rating:4.4,reviews:18,distance:"2.1 km",type:"Fast Charger",power:"60 kW",address:"Pimpri Main Road, Pune"},
 {id:3,name:"EV Power Point",rating:4.2,reviews:11,distance:"3.4 km",type:"Normal Charger",power:"22 kW",address:"Akurdi, Pune"}
];

function Protected({children}){return localStorage.getItem("ev_token")?children:<Navigate to="/login" replace/>}

function Login(){
 const [mode,setMode]=useState("login"),[name,setName]=useState(""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 const nav=useNavigate();
 async function submit(e){
  e.preventDefault();setError("");setLoading(true);
  try{
   const url=mode==="login"?"/auth/login":"/auth/register";
   const payload=mode==="login"?{email,password}:{name,email,password};
   const r=await api.post(url,payload);
   localStorage.setItem("ev_token",r.data.token);localStorage.setItem("ev_user",JSON.stringify(r.data.user));nav("/");
  }catch(err){setError(err.response?.data?.message||"Please check the backend and try again.")}finally{setLoading(false)}
 }
 return <div className="auth-page">
  <div className="auth-photo"><div className="auth-shade"><b className="brand"><Zap fill="currentColor"/> EV Assist</b><h1>Your EV Breaks Down?<br/><span>We're Here to Help.</span></h1><p>Quick help for battery, charging and mechanical EV problems.</p></div></div>
  <div className="auth-panel"><form className="auth-box" onSubmit={submit}>
   <div className="mobile-brand"><Zap fill="currentColor"/> EV Assist</div>
   <h2>{mode==="login"?"Welcome Back":"Create Account"}</h2><p className="muted">{mode==="login"?"Login to continue to EV Assist.":"Create your EV Assist account."}</p>
   {mode==="register"&&<label>Name<input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your name"/></label>}
   <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com"/></label>
   <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength="6" placeholder="Minimum 6 characters"/></label>
   {error&&<div className="error">{error}</div>}
   <button className="primary full" disabled={loading}>{loading?"Please wait...":mode==="login"?"Login":"Create Account"}</button>
   <button type="button" className="link-btn" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create a new account":"Already have an account? Login"}</button>
   <button type="button" className="link-btn" onClick={()=>nav("/")}>Continue as Demo</button>
  </form></div>
 </div>
}

function Layout({children}){
 const [open,setOpen]=useState(false),nav=useNavigate();
 function logout(){localStorage.removeItem("ev_token");localStorage.removeItem("ev_user");nav("/login")}
 return <div className="shell"><header className="topbar">
  <Link className="logo" to="/"><span><Zap fill="currentColor"/></span>EV Assist</Link>
  <nav className={open?"nav open":"nav"}>
   <NavLink to="/" end>Home</NavLink><NavLink to="/charging">Charging</NavLink><NavLink to="/battery">Battery</NavLink><NavLink to="/mechanic">Mechanic</NavLink><NavLink to="/profile">Profile</NavLink>
   <button className="logout" onClick={logout}><LogOut size={16}/> Logout</button>
  </nav><button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
 </header>{children}</div>
}

function Home(){
 const [help,setHelp]=useState(false),nav=useNavigate();
 const cards=[
  ["Find Charging Station","जवळच्या चार्जिंग पॉइंटची माहिती",<PlugZap/>,()=>nav("/charging")],
  ["Battery Assistance","बॅटरी समस्या? मदत मिळवा",<BatteryCharging/>,()=>nav("/battery")],
  ["Vehicle Support","मेकॅनिक जवळ आहे का ते पहा",<Wrench/>,()=>nav("/mechanic")],
  ["My Trips","माहिती आणि इतिहास",<Navigation/>,()=>nav("/profile")]
 ];
 return <>
  <section className="hero"><div className="hero-bg"/><div className="hero-shade"/><div className="hero-content">
   <small>24/7 ELECTRIC VEHICLE SUPPORT</small><h1>Your EV Breaks Down?<br/><span>We're Here to Help.</span></h1>
   <p>Get quick help for EV breakdowns, battery problems, charging issues and nearby mechanical support.</p>
   <div className="actions"><button className="primary" onClick={()=>setHelp(true)}>Get Help</button><button className="secondary" onClick={()=>nav("/charging")}>Find Charging</button></div>
  </div></section>
  <section className="section"><div className="heading"><small>EV SUPPORT</small><h2>What do you need?</h2><p>Choose a service and get help quickly.</p></div>
   <div className="service-grid">{cards.map(([t,d,i,f])=><button className="service" onClick={f} key={t}><span className="service-icon">{i}</span><span><b>{t}</b><small>{d}</small></span><ChevronRight/></button>)}</div>
  </section>
  <div className="info"><div><ShieldCheck/><b>Simple & Safe<small>Request the right EV support.</small></b></div><div><MapPin/><b>Nearby Services<small>Charging, battery and mechanics.</small></b></div><div><Clock3/><b>Quick Assistance<small>Save time during breakdowns.</small></b></div></div>
  {help&&<div className="modal-bg" onClick={()=>setHelp(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setHelp(false)}><X/></button><h2>Get EV Help ⚡</h2>{[["Battery Problem","/battery",<BatteryCharging/>],["Charging Problem","/charging",<PlugZap/>],["Mechanical Problem","/mechanic",<Wrench/>],["EV Breakdown","/mechanic",<Car/>]].map(([t,p,i])=><button className="choice" key={t} onClick={()=>nav(p)}>{i}<b>{t}</b><ChevronRight/></button>)}</div></div>}
 </>
}

function Page({title,children,back=true}){const nav=useNavigate();return <main className="page"><div className="page-title">{back&&<button onClick={()=>nav(-1)}><ArrowLeft/></button>}<div><h1>{title}</h1><p>EV Assist support</p></div></div>{children}</main>}

function Charging(){
 const [q,setQ]=useState("");const list=stations.filter(x=>x.name.toLowerCase().includes(q.toLowerCase()));
 return <Page title="Charging Stations"><div className="search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search charging station..."/><Crosshair/></div>
  <div className="map"><div className="road a"/><div className="road b"/><div className="road c"/>{[15,30,48,65,80].map((x,i)=><MapPin key={i} className="pin" style={{left:x+"%",top:(25+i%3*22)+"%"}} fill="currentColor"/>)}<LocateFixed className="current"/></div>
  <div className="filters"><span>All</span><span>Fast Charging</span><span>Normal Charging</span></div>
  <div className="station-list">{list.map(s=><Station key={s.id} s={s}/>)}</div>
 </Page>
}

function Station({s}){const nav=useNavigate();return <div className="station"><img src="/images/charging-station.svg"/><div><h3>{s.name}</h3><p><b className="rating">★ {s.rating}</b> ({s.reviews}) · {s.distance}</p><p>{s.type} ({s.power})</p><button className="small" onClick={()=>nav("/charging/"+s.id)}>Get Direction <Navigation size={14}/></button></div></div>}

function Details(){
 const s=stations[0];return <Page title="Station Details"><img className="detail-img" src="/images/charging-station.svg"/><div className="detail"><h2>{s.name}</h2><p>⭐ {s.rating} ({s.reviews})</p><p><MapPin size={16}/> {s.address}</p><p><PlugZap size={16}/> {s.type} ({s.power})</p><button className="primary full"><Navigation size={17}/> Get Direction</button></div><div className="photos"><img src="/images/charging-station.svg"/><img src="/images/charging-station.svg"/><img src="/images/charging-station.svg"/></div></Page>
}

function Support({kind}){
 const battery=kind==="battery",[sent,setSent]=useState(false);
 async function request(){try{await api.post("/requests",{type:kind,message:battery?"Battery assistance requested":"Mechanical assistance requested"})}catch{}setSent(true)}
 return <Page title={battery?"Battery Assistance":"Mechanic Support"}><div className="support-icon">{battery?<BatteryCharging size={55}/>:<Wrench size={55}/>}</div><div className="center"><h2>{battery?"बॅटरी समस्या? काळजी करू नका!":"जवळचा मेकॅनिक शोधा"}</h2><p>तुमच्या जवळच्या EV support provider कडून मदत घ्या.</p></div><button className="primary full" onClick={request}>{battery?"Find Battery Providers":"Find Mechanic"}</button>{sent&&<div className="success"><CheckCircle2/> Request sent successfully.</div>}<div className="options">{(battery?["Battery Delivery","Battery Replacement","Service Center"]:["Rohit Auto Service","EV Specialist","Service Center"]).map((x,i)=><div key={x}><span className="mini">{battery?<BatteryCharging/>:<Car/>}</span><b>{x}<small>{i===0?"Available nearby":"View service details"}</small></b><ChevronRight/></div>)}</div></Page>
}

function Profile(){
 const u=JSON.parse(localStorage.getItem("ev_user")||'{"name":"EV User","email":"user@example.com"}');
 return <Page title="Profile"><div className="profile-head"><span className="avatar"><User/></span><div><h2>{u.name}</h2><p>{u.email}</p></div></div><div className="profile-list">{[[Car,"My Vehicles","Add / Manage EV"],[History,"Past Trips","View history"],[Bell,"Notifications","Alerts & Updates"],[CircleHelp,"Help & Support","Contact us"],[Settings,"Settings","App preferences"]].map(([I,t,s])=><div key={t}><I/><b>{t}<small>{s}</small></b><ChevronRight/></div>)}</div></Page>
}

function App(){return <Routes><Route path="/login" element={<Login/>}/><Route path="*" element={<Protected><Layout><Routes><Route path="/" element={<Home/>}/><Route path="/charging" element={<Charging/>}/><Route path="/charging/:id" element={<Details/>}/><Route path="/battery" element={<Support kind="battery"/>}/><Route path="/mechanic" element={<Support kind="mechanic"/>}/><Route path="/profile" element={<Profile/>}/><Route path="*" element={<Navigate to="/"/>}/></Routes></Layout></Protected>}/></Routes>}
export default App;
