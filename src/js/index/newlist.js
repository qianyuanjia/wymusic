{
    let view={
        el:'.newlist',
        template:`
            <li data-song-id="{{id}}}">
                <div>
                    <h2>{{name}}</h2>
                    <p>
                        <img src="images/sq.png" alt="">
                        {{singer}}
                    </p>
                </div>
                <img src="images/playicon.png" alt="" class="play_icon">
            </li>
        `,
        render(songs){
            let htmlStr=''
            for(let i=songs.length-1;i>=0;i--){
                let str=this.template
                str=str.replace('{{id}}',songs[i].id)
                str=str.replace('{{name}}',songs[i].attributes.name.slice(0,-4))
                str=str.replace('{{singer}}',songs[i].attributes.singer)
                htmlStr+=str
            }
            $(this.el).html(htmlStr)
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
        getSongs(){
            var query = new AV.Query('Song');
            query.find().then((songs)=>{
                this.view.render(songs)
                $('.loading').hide()
            })
        }
    }
    let controller={
        init(view,modle){
            this.view=view
            this.modle=modle
            this.modle.init()
            this.bindEvents()
        },
        bindEvents(){
            window.onload=()=>{
                this.modle.getSongs.call(this)
            }
            $(this.view.el).on('click','li',(ev)=>{

            })
        }
    }
    controller.init(view,modle)
}