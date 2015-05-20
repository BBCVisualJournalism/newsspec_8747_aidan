<div id="gbcs-CapitalsView" class="CapitalsView is-hidden">
    <h2>About the capitals</h2>
    <p class="CapitalsView-help">Coloured wedges represent your details, select icons to find out more.</p>
    <ul class="CapitalsView-buttons">
        <li class="CapitalsView-button CapitalsView-button-economic">
            <a href="#gbcs-CapitalsView-economic">
                <i class="sprite sprite-icon-economic"></i>
                Economic capital
            </a>
        </li>
        <li class="CapitalsView-button CapitalsView-button-social">
            <a href="#gbcs-CapitalsView-social">
                <i class="sprite sprite-icon-social"></i>
                Social capital
            </a>
        </li>
        <li class="CapitalsView-button CapitalsView-button-cultural">
            <a href="#gbcs-CapitalsView-cultural">
                <i class="sprite sprite-icon-cultural"></i>
                Cultural capital
            </a>
        </li>
    </ul>
    <ul>
        <li id="gbcs-CapitalsView-economic" class="CapitalsView-popover" tabindex="-1">
            <h3>Economic capital</h3>
            <p><%= include('popover-economic.inc') %></p>
            <button class="close sprite sprite-close">Close</button>
        </li>
        <li id="gbcs-CapitalsView-social" class="CapitalsView-popover" tabindex="-1">
            <h3>Social capital</h3>
            <p><%= include('popover-social.inc') %></p>
            <button class="close sprite sprite-close">Close</button>
        </li>
        <li id="gbcs-CapitalsView-cultural" class="CapitalsView-popover" tabindex="-1">
            <h3>Cultural capital</h3>
            <p><%= include('popover-cultural.inc') %></p>
            <button class="close sprite sprite-close">Close</button>
        </li>
    </ul>
</div>