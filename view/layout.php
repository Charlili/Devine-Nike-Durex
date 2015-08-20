<!DOCTYPE html>
<html>
    <head>        

        <meta charset="utf-8">
        <title>Loapn in awen bloatn</title>
        <link rel="stylesheet" href="css/screen.css">
        <meta property="og:image" content="http://student.howest.be/charlotte.vanroelen/20142015/MAIII/COLLAB/assets/images/nakedRun.png" />
        <meta name="description" content="Nike en Durex organiseren samen een marathon voor het goede doel. Maar pas op, hier mag je alleen naakt aan meedoen!" />
        <meta property="og:title" content="The Naked Run" />

        <script>
          WebFontConfig = {
              custom: {
                families: ['avenir_regular','avenir_light','avenir_light_italic','seravek','futura_italic'],
                urls: ['assets/fonts/fonts.css']
              }
            };

          (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                      '://ajax.googleapis.com/ajax/libs/webfont/1.5.6/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            wf.class = 'font';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
          })();
        </script>

    </head>
    <body>
        <div class="main-centered">
            <header>
                <nav>
                    <ul>
                        <li class='active'><a href='#marathon'>Marathon</a></li>
                        <li><a href='#praktisch'>Praktisch</a></li>
                        <li><a href='#spelen'>Spelen</a></li>
                    </ul>
                </nav>
            </header>
        
            <div class="info box"><?php if(!empty($_SESSION['info'])){ echo $_SESSION['info'];}?></div>
            <div class="error box"><?php if(!empty($_SESSION['error'])){ echo $_SESSION['error'];}?></div>
            <div class="pages">
                <?php echo $content; ?>
            </div>
        </div> 

    </body>
    <script src="js/vendor/fallback/fallback.min.js"></script>
    <script src='js/script.dist.js'></script>
</html>