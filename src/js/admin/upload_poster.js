{
    let view={
        el:'#uparea_poster',
        template:`
            <p id="up_poster_btn">
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-0801zengjia"></use>
                </svg>
                上传歌曲封面
            </p>
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
            function upload(){
                var uploader = Qiniu.uploader({
                    disable_statistics_report: false,   // 禁止自动发送上传统计信息到七牛，默认允许发送
                    runtimes: 'html5',      // 上传模式,依次退化
                    browse_button: 'up_poster_btn',         // 上传选择的点选按钮，**必需**

                    uptoken_url: 'http://localhost:9000/uptoken',

                    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
                    container: 'uparea_poster',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
                    max_file_size: '40mb',             // 最大文件体积限制
                    dragdrop: true,                     // 开启可拖曳上传
                    drop_element: 'uparea_poster',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                  // 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                    max_retries: 3,                     // 上传失败最大重试次数
                    domain: 'http://pb54jh10a.bkt.clouddn.com/',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                    init: {
                        'UploadProgress': (up, file) => {
                            // 每个文件上传时,处理相关的事情
                            $('.uploading').removeClass('hide').children().text('上传中，请稍后')
                        },
                        'FileUploaded': (up, file, info) => {
                            $('.uploading span').text('上传成功！')
                        },
                        'Error': (up, err, errTip) => {
                            //上传出错时,处理相关的事情
                            $('.uploading span').text('上传失败！')

                        },
                        'UploadComplete': () => {
                            //队列文件处理完毕后,处理相关的事情
                            setTimeout(() => {
                                $('.uploading').addClass('hide')
                            }, 1000)
                        }
                    }
                })
            }
            upload()

        }
    }

    controller.init(view,modle)
}