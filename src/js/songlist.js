{
    let view={
        el:'.songlist',
        template:`
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-music"></use>
                    </svg>
                    <div>
                        <p class="songname">刚好遇见你</p>
                        <p class="singer">排骨教主</p>
                    </div>
                </li>
        `,
        render(){
            $(this.el).html(this.template)
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
        getSongInfo(){
            var query = new AV.Query('Song');
            query.find().then(function (songs) {

                console.log(songs[0].attributes);
            })
        }
    }
    let controller={
        init(view,modle){
            this.view=view
            this.modle=modle
            this.modle.init()
            this.modle.getSongInfo()
            this.view.render()
            this.bindEvents()
        },
        bindEvents(){
            window.eventHub.on('upload_success',(data)=>{
                console.log("sonlist receive")
                console.log(data);
            })
        }
    }
    controller.init(view,modle)
}