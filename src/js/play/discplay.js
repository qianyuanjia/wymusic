{
    let view={
        el:'.disc',
        template:`
            <img src="images/disc_default.png" alt="" class="disc_default">
            <img src="{{poster}}" alt="" class="disc_post">
            <img src="images/disc.png" alt="" class="disc_pie">
            <img src="images/disc_light.png" alt="" class="disc_light">
            <img src="images/disc_play.png" alt="" class="disc_play">
        `,
        render(posterurl){
            let str=''
            console.log(str)
            str=this.template.replace('{{poster}}',posterurl)
            $(this.el).html(str)
        }
    }
    let modle={
        init(){
            var APP_ID = 'TLbHUXKn9WBbtCYOr8yGfNdf-gzGzoHsz';
            var APP_KEY = 'TvM4cjnCvH4vVgC0p4MeCA6o';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        getSongInfo(id){
            var query = new AV.Query('Song');
            query.get(id).then((song)=>{
                let posterurl=song.attributes.poster
                $('.wrap .before').css('backgroundImage','url("'+posterurl+'")')
                this.view.render(posterurl)
                let len=song.attributes.name.length
                window.eventHub.emit('getLyrics',{lyrics:song.attributes.lyrics,songname:song.attributes.name.substr(0,len-4)})
            })
        }
    }
    let controller={
        init(view,modle){
            this.view=view
            this.modle=modle
            this.play=false
            this.modle.init()
            this.bindEvents()
        },
        bindEvents(){
            $(window).on('load',()=>{
                let id=url('?',window.location.href).id
                this.modle.getSongInfo.call(this,id)
            })
            $(document).on('click',(ev)=>{
                if(!this.play){
                    $('audio').get(0).play()
                    $(this.view.el).children('.disc_play').hide()
                        .siblings('.disc_post').addClass('play')
                }else{
                    $('audio').get(0).pause()
                    $(this.view.el).children('.disc_play').show()
                        .siblings('.disc_post').removeClass('play')
                }
                this.play=!this.play
            })
        }
    }
    controller.init(view,modle)
}