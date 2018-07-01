{
    let view={
        el:'#uparea',
        template:`
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-0801zengjia"></use>
            </svg>
            <span id="upbtn">上传音频文件</span>
        `,
        render(){
            $(this.el).html(this.template)
        }
    }
    let modle={}
    let controller= {
        init(view, modle) {
            this.view = view
            this.modle = modle
            this.view.render()
            this.upload()
        },
        upload(){
            var uploader = Qiniu.uploader({
                disable_statistics_report: false,   // 禁止自动发送上传统计信息到七牛，默认允许发送
                runtimes: 'html5',      // 上传模式,依次退化
                browse_button: 'upbtn',         // 上传选择的点选按钮，**必需**

                uptoken_url: 'http://localhost:9000/uptoken',

                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
                container: 'uparea',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
                max_file_size: '40mb',             // 最大文件体积限制
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: 'uparea',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                max_retries: 3,                     // 上传失败最大重试次数
                domain: 'http://pb54jh10a.bkt.clouddn.com/',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                init:{
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情

                    },
                    'UploadProgress': (up, file)=>{
                        // 每个文件上传时,处理相关的事情
                        $('.uploading').removeClass('hide').children().text('上传中，请稍后')
                    },
                    'FileUploaded': (up, file, info)=>{
                        // 每个文件上传成功后,处理相关的事情
                        // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info.response);
                        var domain= 'http://pb54jh10a.bkt.clouddn.com/'
                        var songinfo={}
                        songinfo.name=file.name
                        songinfo.url = domain + encodeURIComponent(songinfo.name); //获取上传成功后的文件的Url
                        songinfo.singer='佚名'
                        if(songinfo.name.indexOf('-')>0){
                            songinfo.singer=songinfo.name.split('-')[0].trim() || '佚名'
                        }
                        $('.uploading span').text('上传成功！')
                        window.eventHub.emit('upload_success',JSON.parse(JSON.stringify(songinfo)))

                    },
                    'Error': (up, err, errTip)=>{
                        //上传出错时,处理相关的事情
                        $('.uploading span').text('上传失败！')

                    },
                    'UploadComplete': ()=>{
                        //队列文件处理完毕后,处理相关的事情
                        setTimeout(()=>{
                            $('.uploading').addClass('hide')
                        },1000)

                    }
                }
            })
        }
    }
    controller.init(view,modle)
}