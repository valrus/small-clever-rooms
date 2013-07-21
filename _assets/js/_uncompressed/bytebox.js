var bytebox=function(){
    var stt,stl,stw,sth,b,c,tn,i,tit,im,src,co,st,l,cl,tp,lp,n,pr,ne,a,nx,ni,n_i;
    return{
        init:function(){
            var ls = document.body.getElementsByTagName("a");
            for (i=0;i<ls.length;i++){
                var rel=ls[i].rel;            
                if (rel=='bytebox'){
                    ls[i].onclick=bytebox.ld;
                }
            }
        },
        ld:function(){
            st=0;
            a=this;
            d=document;
            b=d.createElement('div'); 
            d.body.appendChild(b);
            b.id='bb_ov';
            b.style.width=bytebox.wt()+"px";
            b.style.height=bytebox.ht()+"px";
            b.style.opacity=0.1;co=1; 
            b.style.filter='alpha(opacity=01)';
            b.onclick=bytebox.r;
            if(this.title){tit=this.title;}
            src=this.href;
            setTimeout(bytebox.fd,1);
            return false;
        },
        fd:function(){
            if(co<=80&&st==0){
                co=co+20;
                b.style.opacity=co/100;
                b.style.filter='alpha(opacity='+co+')';
                setTimeout(bytebox.fd,0.5);
            }
            else if(st==0){
                d=document;
                n=d.createElement('img');
                n.src="images/loading.gif";
                l=d.createElement('div');
                l.style.width="126px";
                l.style.height="22px";
                l.id="bb_l";
                tp=(((bytebox.h()/2)-((22/2)+25))+bytebox.t());
                lp=((bytebox.w()/2)-((126/2)+20));
                l.style.left=lp+"px";
                l.style.top=tp+"px";
                l.appendChild(n);
                d.body.appendChild(l);
                im = new Image();
                im.onload=bytebox.l;
                im.src = src;
            }
            if(co<=100&&st==1){
                co=co+20;
                i.style.opacity=co/100;
                i.style.filter='alpha(opacity='+co+')';
                setTimeout(bytebox.fd,3);
            }
        },
        l:function(){
            document.body.removeChild(l);
            d=document;
            ih=im.height;
            i=d.createElement('div');
            i.id='bb_div';
            tp=(((bytebox.h()/2)-((ih/2)+25))+bytebox.t());
            lp=((bytebox.w()/2)-((im.width/2)+20));
            if((tp+ih+60)>=bytebox.ht()){
                tp=bytebox.ht()-tp;
                tp=bytebox.ht()-(ih+60);
                i.style.top=tp+"px";
                }
            else if(tp<50){tp=50;i.style.top="50px"}
            else{
                i.style.top=tp+"px";
            }            
            i.style.left=lp+"px";
            i.style.width=im.width+"px";
            i.cw=im.width;i.ch=im.height;            
            i.style.height=(tit)?(im.height+40)+"px":im.height+"px";
            
            n_i=d.createElement('img');
            n_i.onclick=bytebox.r;
            n_i.src=im.src;
            i.appendChild(n_i);            
            c=d.createElement('div');
            c.id='bb_da';
            if(tit){    
                tn = document.createTextNode(tit);
                c.appendChild(tn);
            }
            d.body.appendChild(i);
            i.appendChild(c);
            i.style.opacity=0.1;
            co=1; 
            i.style.filter='alpha(opacity=01)';
            st=1;
            setTimeout(bytebox.fd,1);
        },
        r:function(){
            st=2;
            if(l&&document.getElementById(l.id)){
                document.body.removeChild(l);
            }
            if(cl&&document.getElementById(cl.id)){
                document.body.removeChild(cl);
                cl=null;
            }
            tit=null;
            document.body.removeChild(b);
            document.body.removeChild(i);
        },
        tr:function(){
            n.style.display="none";
            i.sw=i.cw;i.sh=i.ch;
            tw=Math.abs(i.sw-ni.width);
            th=Math.abs(i.sh-ni.height);
            stw=tw/8;sth=th/8;            
            ntp=(((bytebox.h()/2)-((ni.height/2)+25))+bytebox.t());
            nlp=((bytebox.w()/2)-((ni.width/2)+20));
            ntps=Math.abs(ntp-tp);
            nlps=Math.abs(nlp-lp);
            stt=ntps/8;stl=nlps/8;
            bytebox.resize();
        },
        fd2:function(){            
            if(co<=100){
                co=co+15;
                n_i.style.opacity=co/100;
                n_i.style.filter='alpha(opacity='+co+')';
                setTimeout(bytebox.fd2,100);
            }
            else{
                pr.style.height=im.height+"px";
                pr.style.position="relative";
                pr.style.marginTop=-im.height+"px";    

                ne.style.height=im.height+"px";
                ne.style.position="relative";
                ne.style.marginTop=-im.height+"px";
                ne.style.marginLeft=(im.width-100)+"px";

                cl.style.top=(tp-10)+"px";
                cl.style.left=((lp+im.width)-20)+"px";
                if(tit){
                    ntn = document.createTextNode(tit);
                    if(tn){
                        c.replaceChild(ntn,tn);
                    }
                    else{c.appendChild(ntn);}
                    tn=ntn;
                    c.style.display="block";
                    i.style.height=(tit)?(im.height+40)+"px":im.height+"px";
            
                }
                ne.style.display="block";
                pr.style.display="block";
                cl.style.display="block";                
            }
            return;
        },
        t:function(){return document.body.scrollTop||document.documentElement.scrollTop},
        w:function(){return self.innerWidth||(document.documentElement.clientWidth||document.body.clientWidth);},
        h:function(){return self.innerHeight||(document.documentElement.clientHeight||document.body.clientHeight);},
        wt:function(){return(document.body.scrollWidth||document.documentElement.scrollWidth)||(document.body.clientWidth||document.documentElement.clientWidth);},
        ht:function(){return(document.body.scrollHeight||document.documentElement.scrollHeight)||(document.body.clientHeight||document.documentElement.clientHeight);}
    }
}();
