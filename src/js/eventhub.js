window.eventHub={
    events:{},
    on(ev_name,handle){
        if(!this.events[ev_name]){
            this.events[ev_name]=[handle]
        }else{
            this.events[ev_name].push(handle)
        }
    },
    emit(ev_name,data){
        let has_ev=false
        for(let key in this.events){
            if(key===ev_name){
                for(let handle of this.events[key]){
                    handle.call(undefined,data)
                }
                has_ev=true
                break
            }
        }
        if(!has_ev){
            console.log("no such event has been listening")
        }
    },
    // off(ev_name,handle){
    //     for(let key in this.events){
    //         if(key === ev_name){
    //             this.events[key].forEach((val,idx)=>{
    //                 if(handle==val){
    //                     this.events[key].splice(idx,1)
    //                 }
    //             })
    //         }
    //     }
    // }
}