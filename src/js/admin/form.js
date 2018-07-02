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
                        <input type="button" value="删除" class="delete hide">
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
            this.bindEvents.call(this)
        },
        padFormValue(data){
            let formObj=$(this.view.el).find('form').get(0)
            formObj.name.value=data.name
            formObj.singer.value=data.singer
            formObj.url.value=data.url
        },
        bindEvents(){
            window.eventHub.on('upload_success',(data)=>{
                this.padFormValue(data)
            })
            $(this.view.el).find('.submit').on('click',(ev)=>{
                ev.preventDefault()
                var formObj=$(this.view.el).find('form').get(0)
                if(!(formObj.name.value && formObj.singer.value && formObj.url.value)){
                    $('.uploading').removeClass('hide').children().text('请填写完整信息！')
                    setTimeout(()=>{
                        $('.uploading').addClass('hide')
                    },1000)
                    return
                }
                var targetObj=ev.currentTarget
                if(targetObj.value=='确定'){
                    // 声明类型
                    var SongClass = AV.Object.extend('Song');
                    // 新建对象
                    var song = new SongClass();

                    // 设置名称
                    song.set({
                        name:formObj.name.value,
                        singer:formObj.singer.value,
                        url:formObj.url.value
                    });
                    song.save().then(function (info) {
                        window.eventHub.emit('save_success',info)
                        $('.uploading').removeClass('hide').children().text('保存成功！')
                        setTimeout(()=>{
                            $('.uploading').addClass('hide')
                        },1000)
                        formObj.reset()
                    })
                }else{
                    // 第一个参数是 className，第二个参数是 objectId
                    var song = AV.Object.createWithoutData('Song', this.updateId);
                    // 修改属性
                    song.set({
                        name:formObj.name.value,
                        singer:formObj.singer.value,
                        url:formObj.url.value
                    });
                    // 保存到云端
                    song.save().then(function (info) {
                        window.eventHub.emit('update_success',info)
                        $('.uploading').removeClass('hide').children().text('修改成功！')
                        setTimeout(()=>{
                            $('.uploading').addClass('hide')
                        },1000)
                        formObj.reset()
                        targetObj.value='确定'
                        $('.delete').addClass('hide')
                    });
                }
            })
            window.eventHub.on('fetchSongInfo',(data)=>{
                this.padFormValue(data)
                this.updateId=data.id
                $(this.view.el).find('.submit').val('修改')
                $(this.view.el).find('.delete').removeClass('hide')

            })
            $(this.view.el).find('.delete').on('click',(ev)=>{
                var song = AV.Object.createWithoutData('Song', this.updateId);
                song.destroy().then((info)=>{
                    window.eventHub.emit('delete_success',info)
                    $('.uploading').removeClass('hide').children().text('删除成功！')
                    setTimeout(()=>{
                        $('.uploading').addClass('hide')
                    },1000)
                    $(this.view.el).find('form').get(0).reset()
                    $(this.view.el).find('.submit').val('确定')
                    $(ev.currentTarget).addClass('hide')
                });
            })
        }
    }
    controller.init(view,modle)
}