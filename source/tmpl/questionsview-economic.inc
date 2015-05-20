<form class="is-hidden" tabindex="-1" autocomplete="off">

    <h3 class="visuallyhidden">Economic</h3>

    <fieldset data-ui="radios">
        <legend class="h2"><%= include('question-economic-income.inc') %></legend>

        <label for="economic-income-0">
            <i class="sprite"></i>
            <input type="radio" id="economic-income-0" name="economic-income" value="0.08" checked="checked">
            Under £10k
        </label>
        <label for="economic-income-1">
            <i class="sprite"></i>
            <input type="radio" id="economic-income-1" name="economic-income" value="0.175">
            £10-25k
        </label>
        <label for="economic-income-2">
            <i class="sprite"></i>
            <input type="radio" id="economic-income-2" name="economic-income" value="0.375">
            £25-50k
        </label>
        <label for="economic-income-3">
            <i class="sprite"></i>
            <input type="radio" id="economic-income-3" name="economic-income" value="0.6">
            £50-100k
        </label>
        <label for="economic-income-4">
            <i class="sprite"></i>
            <input type="radio" id="economic-income-4" name="economic-income" value="1">
            Over £100k
        </label>
    </fieldset>

    <fieldset>
        <legend class="h2"><%= include('question-economic-property.inc') %></legend>

        <fieldset class="economic-propertytype" data-ui="radios">
            <label for="economic-propertytype-own">
                <i class="sprite"></i>
                <input type="radio" id="economic-propertytype-own" name="economic-propertytype" value="own" checked="checked">
                Own
            </label>
            <label for="economic-propertytype-rent">
                <i class="sprite"></i>
                <input type="radio" id="economic-propertytype-rent" name="economic-propertytype" value="rent">
                Rent
            </label>
        </fieldset>

        <input type="hidden" name="economic-property" value="0">
        <fieldset class="economic-property" data-ui="radios">
            <label for="economic-property-0">
                <i class="sprite"></i>
                <input type="radio" id="economic-property-0" name="economic-property" value="0.16" checked="checked">
                Under £125k
            </label>
            <label for="economic-property-2">
                <i class="sprite"></i>
                <input type="radio" id="economic-property-2" name="economic-property" value="0.36">
                £125-250k
            </label>
            <label for="economic-property-3">
                <i class="sprite"></i>
                <input type="radio" id="economic-property-3" name="economic-property" value="0.65">
                £250-500k
            </label>
            <label for="economic-property-4">
                <i class="sprite"></i>
                <input type="radio" id="economic-property-4" name="economic-property" value="1">
                Over £500k
            </label>
        </fieldset>
    </fieldset>

    <fieldset data-ui="radios" class="last-child">
        <legend class="h2"><%= include('question-economic-savings.inc') %></legend>

        <label for="economic-savings-0">
            <i class="sprite"></i>
            <input type="radio" id="economic-savings-0" name="economic-savings" value="0" checked="checked">
            None
        </label>
        <label for="economic-savings-1">
            <i class="sprite"></i>
            <input type="radio" id="economic-savings-1" name="economic-savings" value="0.054">
            £0-10k
        </label>
        <label for="economic-savings-3">
            <i class="sprite"></i>
            <input type="radio" id="economic-savings-3" name="economic-savings" value="0.116">
            £10-25k
        </label>
        <label for="economic-savings-4">
            <i class="sprite"></i>
            <input type="radio" id="economic-savings-4" name="economic-savings" value="0.25">
            £25-50k
        </label>
        <label for="economic-savings-5">
            <i class="sprite"></i>
            <input type="radio" id="economic-savings-5" name="economic-savings" value="0.5">
            £50-100k
        </label>
        <label for="economic-savings-6">
            <i class="sprite"></i>
            <input type="radio" id="economic-savings-6" name="economic-savings" value="1">
            Over £100k
        </label>
    </fieldset>

    <div class="QuestionsView-nav">
        <button type="submit">Next<i class="sprite sprite-icon-next"></i></button>
        <button class="prev" type="button" disabled="disabled">Prev<i class="sprite sprite-icon-prev"></i></button>
    </div>

  </form>