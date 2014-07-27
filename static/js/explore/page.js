define([
  'jquery',
  'underscore',
  
  'text!js/explore/data.json',
  'text!js/explore/template/recipe_card.utpl',

], function(
  $,
  _,
  
  data_text,
  recipie_card_template
){

  var entries = JSON.parse(data_text);

  var $search_input = $("[data-action='search']");
  var $result_container = $("#recipe-container");


  var render = function(entries) {
    $result_container.html('');
    _.each(entries, function(entry){
      var $el = $(
        _.template(recipie_card_template, entry)
      )
      $result_container.append($el);
    })
  };

  var getFiltered = function(entries, keyword) {
    var filtered = _.filter(entries, function(entry) {
      if (entry.title && entry.title.toLowerCase().indexOf(keyword) != -1)
        return true;

      if (entry.creator && entry.creator.toLowerCase().indexOf(keyword) != -1)
        return true;
      
      if (entry.category && entry.category.toLowerCase().indexOf(keyword) != -1)
        return true;

      var found = _.find(entry.tags, function(tag) {
        if (tag.toLowerCase().indexOf(keyword) != -1)
          return true;
      });
      if (found) return true;
    });

    return filtered;
  };

  $search_input.on('keyup', function(evt) {
    var filtered;
    var keyword = $(evt.currentTarget).val().toLowerCase();
    if (!keyword) {
      filtered = entries;
    } else {
      filtered = getFiltered(entries, keyword);
    }
    render(filtered);
  });

  render(entries);
})