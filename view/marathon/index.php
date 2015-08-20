<section class='page' id='marathon'>
    <header><h1>Welkom bij The Naked Run!</h1></header>
    <div class='float'>
        <video src='assets/video/promo.mp4' preload='none' poster='assets/images/placeholder.gif' width='903px' height='508px'>
            <source src="assets/video/promo.mp4" type="video/mp4" />
            <source src="assets/video/promo.webm" type="video/webm" />
            <img src='assets/images/placeholder.gif' alt='Nike and Durex present The Naked Run'/>
        </video>
    </div>
    <div class='float right'>
        <h2>Loop mee voor het goede doel</h2>
        <p>met wind door je haar en ook daar.</p>
        <p>Laat je edele delen vrij hangen
        <br/>want naakt zijn met meer is leuker.</p>
        <p>Elk jaar zijn er een biljoen mensen
        <br/>die sterven aan <oblique>onbeschermde sex.</oblique></p>
        <p>Sex met vreemden doe je best niet naakt.
        <br/>Maar lopen kan alvast wel.
        <br/><strong class='blue'>Laten we samen soa's voorkomen!</strong></p>
        <a class='btn' href='#praktisch' title='Schrijf je nu in!'>schrijf je in</a> 
    </div>
</section>
<section class='page' id='praktisch'>
    <header><h1>Praktische informatie</h1></header>
    <div class='float left'>
        <h2>hoe mee doen?</h2>
        <ul>
            <li>Schrijf u in via de website</li>
            <li>Uw loopnummer wordt <strong class='blue'>via e-mail</strong> doorgestuurd</li>
            <li>Bij de inkom wordt uw loopnummer gecontroleerd</li>
        </ul>
        <h2>inkom</h2>
        <ul>
            <li>Bij de inkom wordt er ook een bijdrage gevraagd van 10 euro</li>
            <li>Hiervan wodt de helft geschonken aan <span class='yellow'>het goede doel</span></li>
        </ul>
        <h2>waar starten we?</h2>
        <ul>
            <li>Het begin van de marathon start voor <b>Flanders Expo Gent</b></li>
            <li>Dit kan je bereiken met openbaar vervoer (tram 1) of de auto (afslag expo)</li>
            <li></li>
        </ul>
    </div>
    <form action='#praktisch' method='post' class='inschrijf_form float right'>
    <label>
        voornaam naam
        <input type='text' class='form_naam' name='naam' value='<?php if(!empty($_POST["naam"])){ echo $_POST["naam"];}?>'/>
    <span class='error'><?php if(!empty($errors['naam'])){ echo $errors['naam']; }?></span></label>
    <label>
        email
        <input type='text' class='form_email' name='email' value='<?php if(!empty($_POST["email"])){ echo $_POST["email"];}?>'/>
    <span class='error'><?php if(!empty($errors['email'])){ echo $errors['email']; }?></span></label>
    <label>
        straat + nummer
        <input type='text' class='form_adres' name='adres' value='<?php if(!empty($_POST["adres"])){ echo $_POST["adres"];}?>'/>
    <span class='error'><?php if(!empty($errors['adres'])){ echo $errors['adres']; }?></span></label>
    <label>
        postcode
        <input type='text' class='form_postcode' name='postcode' value='<?php if(!empty($_POST["postcode"])){ echo $_POST["postcode"];}?>'/>
    <span class='error'><?php if(!empty($errors['postcode'])){ echo $errors['postcode']; }?></span></label>
    <label>
        land
        <input type='text' class='form_land' name='land' value='<?php if(!empty($_POST["land"])){ echo $_POST["land"];}else{echo "belgie";}?>'/>
    <span class='error'><?php if(!empty($errors['land'])){ echo $errors['land']; }?></span></label>
    <input class='btn' type='submit' value='inschrijven'/>
    </form>
</section>
<section class='page' id='spelen'>
    <header><h1>Interactief spelletje</h1></header>
    <p class='een'>Ohnee! Je bent de condoom vergeten!</p>
    <p class='twee'>Trek je Nikes aan en loop snel naar huis om je pakketje Durex op te halen!</p>
    <canvas id="cnvs" width="729px" height="203px">
        <img src='assets/images/game_placeholder.gif'/>
        <p>no canvas support</p>
    </canvas>
    <p class='drie'>Verzamel ondertussen kleren om <i>sneller</i> te zijn.</p>
    <p class='vier'>De 50 snelste winnen een <span class='purple'>verwarmende goodybag</span> na de marathon</p>
    <p class='vijf'>Verstuur je highscore en maak kans!</p>
    <form action='#marathon' method='post' class='inactive form_spelen'>
        <label>
            email
            <input disabled type='text' class='spelen_email' name='email' value='<?php if(!empty($_SESSION["email"])){ echo $_SESSION["email"];}?>'/>
        </label>
        <label class='score'>
            score
            <input disabled type='text' name='score' value='00:10:15'/>
        </label>
        <input disabled class='btn' type='submit' value='verstuur'/>
        <a class='btn delen' href='https://www.facebook.com/sharer/sharer.php?u=student.howest.be/charlotte.vanroelen/20142015/MAIII/COLLAB/#marathon' title='Deel je highscore!'>delen</a> 
    </form>

</section>