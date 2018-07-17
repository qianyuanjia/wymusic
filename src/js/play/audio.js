{
    let view={
        el:'audio',
        template:`
            <audio src="{{url}}"></audio>
        `,
        render(url){
            let str=this.template.replace('{{url}}',url)
            $('body').append(str)
        }
    }
    let modle={}
    let controller={
        init(view,modle){
            this.view=view
            this.modle=modle
            this.bindEvents()
        },
        bindEvents(){
            $(window).on('load',()=>{
                let _this=this
                let query=url('?',window.location.href)
                this.view.render(query.url)
                $(this.view.el).on('timeupdate',function(){
                    let time=Math.round(this.currentTime*100)/100
                    window.eventHub.emit('playTime',time)
                })
                $(this.view.el).on('ended',()=>{
                    window.eventHub.emit('playEnd')
                })
            })

        }
    }
    controller.init(view,modle)
}