{
    let view={
        el:'.bot',
        template:`
            <h2 class="songname">{{songname}}</h2>
            <div class="lyrics">
                <div class="lyricplace"></div>
            </div>
        `,
        render(songname){
            let str=''
            str=this.template.replace('{{songname}}',songname)
            $(this.el).html(str)
        }
    }
    let modle={}
    let controller={
        init(view,modle){
            this.view=view
            this.modle=modle
            this.lyricsArr=[]
            this.bindEvents()
        },
        transformTime(strtime){
            let numArr=strtime.split(':')
            // console.log(numArr)
            let digit=parseInt(numArr[0])
            let fraction=parseFloat(numArr[1])
            return digit*60+fraction
        },
        bindEvents(){
            window.eventHub.on('getLyrics',({lyrics,songname})=>{
                let sentenceArr=lyrics.match(/\[[\d\:\.]+\][^\[]+/g)
                let lyricsArr=[]
                sentenceArr.map(sentence=>{
                    let matchObj={}
                    let matchArr=sentence.match(/\[([\d\:\.]+)\](.+)/)
                    matchObj.time=this.transformTime(matchArr[1])
                    matchObj.lyrics=matchArr[2]
                    lyricsArr.push(matchObj)
                })
                this.lyricsArr=lyricsArr
                this.view.render(songname)
                lyricsArr.map(item=>{
                    $(this.view.el).find('.lyricplace').append(`<p>${item.lyrics}</p>`)
                })
            })
            window.eventHub.on('playTime',time=>{
                for(var i=0;i<this.lyricsArr.length-1;i++){
                    if(this.lyricsArr[i].time<=time && this.lyricsArr[i+1].time>=time){
                        $(this.view.el).find('.lyricplace').css('top',`-${(i-1)*5}vh`)
                        $(this.view.el).find('.lyricplace p').eq(i).addClass('active').siblings().removeClass('active')
                    }
                }
                if(i==this.lyricsArr.length-1 && this.lyricsArr[i-1].time<time && Math.abs(this.lyricsArr[i].time-time)<0.5){
                    $(this.view.el).find('.lyricplace').css('top',`-${(i-1)*5}vh`)
                    $(this.view.el).find('.lyricplace p').eq(i).addClass('active').siblings().removeClass('active')
                }
            })
            window.eventHub.on('playEnd',()=>{
                $(this.view.el).hide()
                $(this.view.el).find('.lyricplace').css('top','0')
            })
            window.eventHub.on('startPlay',()=>{
                $(this.view.el).show()
            })
        }
    }
    controller.init(view,modle)
}