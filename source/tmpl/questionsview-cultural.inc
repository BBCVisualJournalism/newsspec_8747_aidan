<form class="is-hidden" tabindex="-1" autocomplete="off">

    <h3 class="visuallyhidden">Cultural</h3>

    <fieldset data-ui="checkboxes" class="last-child">
        <legend class="h2"><%= include('question-cultural.inc') %>
        </legend>
        <input type="hidden" name="cultural-emerging" value="0">
        <input type="hidden" name="cultural-high" value="0">
        <div class="clearfix">
            <div class="QuestionsView-column">
                <label for="cultural-statelyhomes" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-statelyhomes" name="cultural-high" value="1">
                    Go to stately homes
                </label>
                <label for="cultural-opera" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-opera" name="cultural-high" value="1">
                    Go to the opera
                </label>
                <label for="cultural-jazz" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-jazz" name="cultural-high" value="1">
                    Listen to jazz
                </label>
                <label for="cultural-rock" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-rock" name="cultural-emerging" value="1">
                    Listen to rock/indie
                </label>
                <label for="cultural-gigs" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-gigs" name="cultural-emerging" value="1">
                    Go to gigs
                </label>
                <label for="cultural-games" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-games" name="cultural-emerging" value="1">
                    Play video games
                </label>
                <label for="cultural-sports" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-sports" name="cultural-emerging" value="1">
                    Watch sports
                </label>
                <label for="cultural-theatre" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-theatre" name="cultural-high" value="1">
                    Go to the theatre
                </label>
            </div>
            <div class="QuestionsView-column">
                <label for="cultural-exercise" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-exercise" name="cultural-emerging" value="1">
                    Exercise/go to gym
                </label>
                <label for="cultural-facebook" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-facebook" name="cultural-emerging" value="1">
                    Use Facebook/Twitter
                </label>
                <label for="cultural-home" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-home" name="cultural-emerging" value="1">
                    Socialise at home
                </label>
                <label for="cultural-museums" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-museums" name="cultural-high" value="1">
                    Go to museums/galleries
                </label>
                <label for="cultural-classical" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-classical" name="cultural-high" value="1">
                    Listen to classical music
                </label>
                <label for="cultural-crafts" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-crafts" name="cultural-high" value="1">
                    Do arts and crafts
                </label>
                <label for="cultural-ballet" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-ballet" name="cultural-high" value="1">
                    Watch dance or ballet
                </label>
                <label for="cultural-hiphop" class="for-checkbox">
                    <i class="sprite"></i>
                    <input type="checkbox" id="cultural-hiphop" name="cultural-emerging" value="1">
                    Listen to hip-hop/rap
                </label>
            </div>
        </div>
    </fieldset>

    <div class="QuestionsView-nav">
        <button type="submit">Next<i class="sprite sprite-icon-next"></i></button>
        <button class="prev" type="button">Prev<i class="sprite sprite-icon-prev"></i></button>
    </div>

</form>