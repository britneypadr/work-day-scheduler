$(function () {
  // Get current day and display it
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Function to generate time blocks
  function generateTimeBlocks() {
    var container = $('#scheduler');
    var currentHour = dayjs().hour();

    // Clear existing content
    container.empty();

    // Loop through business hours
    for (var i = 9; i <= 17; i++) {
      var timeBlock = $('<div>').addClass('row time-block');
      if (i < currentHour) {
        timeBlock.addClass('past');
      } else if (i === currentHour) {
        timeBlock.addClass('present');
      } else {
        timeBlock.addClass('future');
      }

      var hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(dayjs().hour(i).format('ha'));
      var descriptionCol = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
        .append($('<i>').addClass('fas fa-save').attr('aria-hidden', 'true'));

      timeBlock.attr('id', 'hour-' + i).append(hourCol, descriptionCol, saveBtn);
      container.append(timeBlock);
    }
  }

  // Load saved events from local storage
  function loadEvents() {
    $('.time-block').each(function () {
      var eventId = $(this).attr('id');
      var savedEvent = localStorage.getItem(eventId);
      if (savedEvent !== null) {
        $(this).find('.description').val(savedEvent);
      }
    });
  }

  // Save event to local storage
  function saveEvent() {
    var eventId = $(this).parent().attr('id');
    var eventDescription = $(this).siblings('.description').val();
    localStorage.setItem(eventId, eventDescription);
  }

  // Generate time blocks and load events
  generateTimeBlocks();
  loadEvents();

  // Event listener for save button
  $(document).on('click', '.saveBtn', saveEvent);
});