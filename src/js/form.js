{
    let view={
        el:'section .wrap',
        template:`
            <form action="###">
                    <div class="row">
                        <label><span>音乐标题：</span><input type="text" name="name"></label>
                    </div>
                    <div class="row">
                        <label><span>歌手：</span><input type="text" name="singer"></label>
                    </div>
                    <div class="row">
                        <label>歌曲外链：<input type="text" name="url"></label>
                    </div>
                    <div class="subtn">
                        <input type="submit" value="确定" class="submit">
                    </div>
             </form>
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
        }
    }
    controller.init(view,modle)
}