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
                for(let i=0;i<this.lyricsArr.length-1;i++){
                    if(this.lyricsArr[i].time<=time && this.lyricsArr[i+1].time>=time){
                        console.log(this.lyricsArr[i].lyrics)
                    }
                }
            })
        }
    }
    controller.init(view,modle)
}