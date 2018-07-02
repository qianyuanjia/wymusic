{
    let view={
        el:'nav',
        template:`
            <ul class="tablist">
                <li class="active">推荐音乐</li>
                <li>热歌榜</li>
                <li>搜索</li>
            </ul>
        `,
        render(){
            $(this.el).html(this.template)
        }
    }
    let modle={}
    let controller={
        init(view,modle){
            this.view=view
            this.modle=modle
            this.view.render()
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).find('.tablist').on('click','li',(ev)=>{
                let idx=$(ev.target).index()+1
                $(ev.target).addClass('active').siblings().removeClass('active')
                $('.tab-'+idx).show().siblings().hide()
            })
        }
    }
    controller.init(view,modle)
}