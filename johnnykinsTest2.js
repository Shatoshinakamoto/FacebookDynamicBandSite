/*
  Johnny kins
  Cause mosts johnnys cant
  but this johnny cannn!!!
  - Johnny Kins
  - aka John1234brown
*/
var storedConfig = null;
var storedEvents = null;


// Function to fetch the JSON file
async function fetchJSONFile(path) {
  if (path === 'config.json') {
    if (storedConfig === null) {
      const response = await fetch(path);
      storedConfig = response.json();
      return storedConfig;
    } else {
      return storedConfig;
    }
  } else if (path === 'events.json') {
    if (storedEvents === null) {
      const response = await fetch(path);
      storedEvents = response.json();
      return storedEvents;
    } else {
      return storedEvents;
    }
  }
}

async function fetchTXTFile(path) {
  const response = await fetch(path);
  console.log('response', response);
  return response.text();
}

async function updateBandName() {
  const bandName = await fetchTXTFile('ourBandName.txt');
  const bandNameElement = document.getElementById('navbar-band-name');
  const bandNameElement2 = document.getElementById('bandName');
  const titleElement3 = document.getElementById('title');
  bandNameElement.textContent = bandName;
  bandNameElement2.textContent = bandName;
  titleElement3.textContent = bandName;
}
updateBandName();

async function updateBandDescription() {
  const bandDescription = await fetchTXTFile('ourBandDescription.txt');
  const bandNameElement2 = document.getElementById('bandDescription');
  bandNameElement2.textContent = bandDescription;
}
updateBandDescription();
// Function to populate the contact links
async function populateContactLinks() {
  const config = await fetchJSONFile('config.json');
  const emailLink = document.getElementById('contactEmail');
  const phoneLink = document.getElementById('contactPhone');
  if (config.contactEmail) {
    console.log(config.contactEmail);
    console.log(`'mailto:' ${config.contactEmail}`)
    emailLink.href = 'mailto:' + config.contactEmail;
  }

  if (config.contactPhone) {
    phoneLink.href = 'tel:' + config.contactPhone;
  }
}

// Function to populate the social links list
async function populateSocialLinks() {
  const config = await fetchJSONFile('config.json');
  const socialLinksList = document.getElementById('additionalSocialList');
  //console.log("Test");
  //console.log('Test :', config.additionalSocialLinks);
  ///console.log("Test 2:", config.additionalSocialLinksList);
  if (config.additionalSocialLinks && config.additionalSocialLinksList) {
    config.additionalSocialLinksList.forEach(item => {
      //console.log(item);
      const link = document.createElement('a');
      link.href = item.link;
      link.textContent = item.text;
      link.classList.add('btn', 'btn-outline-primary', 'm-2');
      socialLinksList.appendChild(link);
      //console.log(socialLinksList);
    });
  }
}

// Function to populate the regular social links
async function populateRegularSocialLinks() {
  const config = await fetchJSONFile('config.json');
  const facebookLink = document.getElementById('facebook');
  const instagramLink = document.getElementById('instagram');
  const twitterLink = document.getElementById('twitter');
  const googleLink = document.getElementById('google');
  const youtubeLink = document.getElementById('youtube');

  if (config.facebook) {
    facebookLink.href = config.facebook;
  }

  if (config.instagram) {
    instagramLink.href = config.instagram;
  }

  if (config.xtwitter) {
    twitterLink.href = config.xtwitter;
  }

  if (config.google) {
    googleLink.href = config.google;
  }

  if (config.youtube) {
    youtubeLink.href = config.youtube;
  }
}

//Populate Cover Pictures! //Deprecated version of populating cover pictures original concept design!
async function updateCoverCarousel() {
  const config = await fetchJSONFile('config.json');
  console.log("config:", config);
  const coverCarousel = document.getElementById('coverCarousel');
  coverCarousel.innerHTML = ''; // Clear existing carousel items

  config.coversPicturesPaths.forEach((path, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const img = document.createElement('img');
    img.src = path;
    img.classList.add('img-fluid');
    img.style.width = '75%';
    img.style.height = '45vh';
    //    img.classList.add('d-block', 'w-50', 'h-50'); // Set width and height to 50%
    img.style.maxHeight = '45vh'; // Set maximum height to 50% of the viewport height
    img.alt = '...';

    if (window.innerHeight > 768 && window.innerWidth < 768) {
      img.style.height = '45vh';
      img.style.maxHeight = '45vh';
    } else if (window.innerHeight > 768 && window.innerWidth > 768) {
      img.style.height = '65vh';
      img.style.maxHeight = '65vh';
    }


    carouselItem.appendChild(img);
    coverCarousel.appendChild(carouselItem);
  });
  /*const config = await fetchJSONFile('config.json');
  console.log("config:", config);
  const coverCarousel = document.getElementById('coverCarousel');
  coverCarousel.innerHTML = ''; // Clear existing carousel items

  config.coversPicturesPaths.forEach((path, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const img = document.createElement('img');
    img.src = path;
    img.classList.add('d-block');
    img.alt = '...';
    img.style.width = '75%'; // Set the width to 75%
    img.style.alignSelf = 'center';

    // Set the maximum height based on the device width
    if (window.innerWidth < 768) {
      // Mobile devices
      img.style.maxHeight = '350px';
    } else {
      // Desktop devices
      img.style.maxHeight = '700px'; // Adjust as needed for your design
    }

    carouselItem.appendChild(img);
    coverCarousel.appendChild(carouselItem);
  });*/
  // Set the data-bs-interval attribute to 1000 milliseconds (1 second)
  console.log("Configuration Picture cycle speed is :", config.coverCarouselSpeed);
  // coverCarousel.setAttribute('data-bs-interval', config.coverCarouselSpeed);
  // Initialize the carousel
  var myCarousel = new bootstrap.Carousel(document.getElementById('cover'), {
    interval: config.coverCarouselSpeed // Set the initial interval to 1 second
  });

  // Function to update the carousel interval
  function updateCarouselInterval(interval) {
    myCarousel.pause(); // Pause the carousel
    myCarousel._config.interval = interval; // Update the interval option
    myCarousel.cycle(); // Restart the carousel with the new interval
  }

  updateCarouselInterval(config.coverCarouselSpeed);
}



//Populate Youtube Videos!
async function updateVideoCarousel() {
  const config = await fetchJSONFile('config.json');
  const videoCarousel = document.getElementById('videoCarousel');
  videoCarousel.innerHTML = ''; // Clear existing carousel items

  config.ourYoutubeVideoEmbeds.forEach((url, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const videoContainer = document.createElement('div');
    //   videoContainer.classList.add('embed-responsive', 'embed-responsive-16by9');
    videoContainer.style.position = 'relative'; // Set position to relative
    videoContainer.style.width = '90%'; // Set the width to 75%
    videoContainer.style.height = '0'; // Set initial height to 0 to maintain aspect ratio
    videoContainer.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
    videoContainer.style.display = 'inline-flex'; // Set display to inline-flex
    videoContainer.style.justifyContent = 'center'; // Center horizontally

    const videoIframe = document.createElement('iframe');
    //    videoIframe.classList.add('embed-responsive-item');
    videoIframe.style.position = 'absolute'; // Set position to absolute
    videoIframe.style.width = '75%'; // Set iframe width to 100%
    videoIframe.style.height = '75%'; // Set iframe height to 100%
    videoIframe.src = url;
    videoIframe.allowfullscreen = true;


    videoContainer.appendChild(videoIframe);
    carouselItem.appendChild(videoContainer);
    videoCarousel.appendChild(carouselItem);
    // Set the width of the iframe to 75%
    videoIframe.style.width = '75%';
    videoIframe.style.height = '75%';
  });

  console.log("Configuration Video cycle speed is :", config.videoCycleSpeed);
  var myCarousel = new bootstrap.Carousel(document.getElementById('videoCarousel'), {
    interval: config.videoCycleSpeed // Set the initial interval to 1 second
  });

  // Function to update the carousel interval
  function updateCarouselInterval(interval) {
    myCarousel.pause(); // Pause the carousel
    myCarousel._config.interval = interval; // Update the interval option
    myCarousel.cycle(); // Restart the carousel with the new interval
  }

  updateCarouselInterval(config.videoCycleSpeed);
}

async function populateEventsFromFacebook(events) {
  console.log('Events', events);
  try {
    const eventsCarousel = document.getElementById('eventsCarousel');
    eventsCarousel.innerHTML = ''; // Clear existing carousel items

    const currentDate = new Date(); // Get the current date


    events.forEach((event, index) => {
      //console.log('Adding events From Facebook:', event);
      // Check if the event date is in the future
      //console.log('Event Date:', event.date);
      if (new Date(event.date) >= currentDate) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
          carouselItem.classList.add('active');
        }

        const img = document.createElement('img');
        img.src = event.pictureUrl;
        img.classList.add('d-block');
        img.alt = 'Event Image';
        img.style.width = '50%'; // Set the width to 75%

        // Set the maximum height based on the device width
        if (window.innerWidth < 768) {
          // Mobile devices
          img.style.maxHeight = '350px';
        } else {
          // Desktop devices
          img.style.maxHeight = '500px'; // Adjust as needed for your design
        }

        const eventBackground = document.createElement('div');
        eventBackground.style.display = 'inline-flex';
        eventBackground.style.alignItems = 'center';
        eventBackground.style.justifyContent = 'center';
        eventBackground.style.width = '75%';
        eventBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        eventBackground.style.padding = '1.5rem';
        eventBackground.style.color = 'white';

        const eventName = document.createElement('h1');
        const trimmedMessage = event.message.substring(0, 50);
        eventName.innerHTML = `${trimmedMessage}<br><strong>Address: ${event.address}</strong><br><strong>Date: ${event.date}</strong><br>`;

        if (event.hasTickets) {
          const eventTicketButton = document.createElement('a');
          eventTicketButton.href = event.ticketUrl;
          eventTicketButton.classList.add('btn', 'btn-secondary', 'btn-lg');
          eventTicketButton.style.backgroundColor = "lightgreen";
          eventTicketButton.style.color = "white";
          eventTicketButton.style.fontSize = '2rem';
          eventTicketButton.style.fontWeight = '900';
          eventTicketButton.innerText = 'Buy Tickets ' + event.ticketPrice;
          eventName.appendChild(eventTicketButton);
        }

        eventBackground.appendChild(eventName);
        carouselItem.appendChild(img);
        carouselItem.appendChild(eventBackground);
        eventsCarousel.appendChild(carouselItem);
      }
    });
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

async function populateEventsCarousel() {
  const response = await fetch('events.json');
  const data = await response.json();

  // Sort events chronologically based on the event date
  await data.events.sort((a, b) => new Date(a.EventDate) - new Date(b.EventDate));
  //console.log("Failed to sort!");

  const eventsCarousel = document.getElementById('eventsCarousel');
  //eventsCarousel.innerHTML = ''; // Clear existing carousel items

  const currentDate = new Date(); // Get the current date
  var counter = 1;

  data.events.forEach((event, index) => {
    // Parse the event date string into a Date object
    const eventDate = new Date(event.EventDate);

    // Check if the event date is in the future
    if (eventDate >= currentDate) {
      console.log("Its within range lets add!");
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (counter === 0) {
        carouselItem.classList.add('active');
      }
      counter = counter + 1;

      const img = document.createElement('img');
      img.src = event.EventPicture;
      img.classList.add('d-block');
      img.alt = 'Event Image';
      img.style.width = '50%'; // Set the width to 75%
      img.style.alignSelf = 'center';

      // Set the maximum height based on the device width
      if (window.innerWidth < 768) {
        // Mobile devices
        img.style.maxHeight = '350px';
      } else {
        // Desktop devices
        img.style.maxHeight = '500px'; // Adjust as needed for your design
      }

      const eventBackground = document.createElement('div');
      eventBackground.style.display = 'inline-flex';
      eventBackground.style.alignItems = 'center';
      eventBackground.style.justifyContent = 'center';
      eventBackground.style.width = '75%';
      eventBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      eventBackground.style.padding = '1.5rem';
      eventBackground.style.color = 'white';

      const eventName = document.createElement('h1');
      if (event.EventTickets) {
        const eventTicketButton = document.createElement('a');
        eventTicketButton.href = event.EventTicketsLink;
        eventTicketButton.classList.add('btn', 'btn-secondary', 'btn-lg');
        eventTicketButton.style.backgroundColor = "lightgreen";
        eventTicketButton.style.color = "white";
        eventTicketButton.style.fontSize = '2rem';
        eventTicketButton.style.fontWeight = '900';
        eventTicketButton.innerText = 'Buy Tickets ' + event.EventTicketsPrice;
        eventName.innerHTML = `<strong>${event.EventName}</strong><br>${event.EventAddress}<br><strong>Date: ${event.EventDate}</strong><br>`
        eventName.appendChild(eventTicketButton);
      } else {
        eventName.innerHTML = `<strong>${event.EventName}</strong><br>${event.EventAddress}<br><strong>Date: ${event.EventDate}</strong>`;
      }
      //    const eventDescription = document.createElement('p');
      //    eventDescription.textContent = event.EventDescription;
      eventBackground.appendChild(eventName);
      //    eventBackground.appendChild(eventDescription);

      carouselItem.appendChild(img);
      carouselItem.appendChild(eventBackground);

      eventsCarousel.appendChild(carouselItem);
    }
  });
  // Update the carousel cycle speed
  var myCarousel = new bootstrap.Carousel(document.getElementById('events'), {
    interval: data.eventCycleSpeed // Set the initial interval
  });

  // Function to update the carousel interval
  function updateCarouselInterval(interval) {
    myCarousel.pause(); // Pause the carousel
    myCarousel._config.interval = interval; // Update the interval option
    myCarousel.cycle(); // Restart the carousel with the new interval
  }

  // Update the carousel interval to the value from the JSON file
  updateCarouselInterval(data.eventCycleSpeed);
}


async function updateSponsors() {
  const config = await fetchJSONFile('config.json');
  const sponsorSection = document.getElementById('sponsors');
  const navbarSponsorSection = document.getElementById('navbar-sponsors')
  const sponsorList = document.getElementById('sponsorList');

  if (!config.ourSponsors) {
    sponsorSection.style.display = 'none';
    navbarSponsorSection.style.display = 'none';
    return; // Exit function early if sponsors should not be displayed
  }

  // Reset display style if sponsors should be displayed
  sponsorSection.style.display = '';
  navbarSponsorSection.style.display = '';

  sponsorList.innerHTML = ''; // Clear existing sponsor logos

  config.ourSponsorsLogoPaths.forEach((path) => {
    const sponsorCol = document.createElement('div');
    sponsorCol.classList.add('col-md-3', 'col-6');

    const sponsorImg = document.createElement('img');
    sponsorImg.classList.add('center-block', 'img-fluid', 'd-block');
    sponsorImg.src = path;

    sponsorCol.appendChild(sponsorImg);
    sponsorList.appendChild(sponsorCol);
  });
}

async function updatePricing() {
  const config = await fetchJSONFile('config.json');
  const pricingDescription = await fetchTXTFile('ourPricingDescription.txt');
  const hoursElement = document.getElementById('hours');
  const priceElement = document.getElementById('price');
  const descriptionElement = document.getElementById('priceDescription');
  console.log(pricingDescription);
  hoursElement.innerHTML = "<strong>" + config.ourPricingHours + "</strong>";
  priceElement.innerHTML = "<strong>" + config.ourPricingPrice + "</strong>";
  descriptionElement.innerHTML = "<strong>" + pricingDescription + "</strong>";
}



async function updateBandMembers() {
  const config = await fetchJSONFile('config.json');
  const bandMembers = document.getElementById('bandMembers');
  bandMembers.innerHTML = ''; // Clear existing band members

  for (let i = 0; i < config.ourBandMembersPhotoPaths.length; i++) {
    const memberCol = document.createElement('div');
    memberCol.classList.add('col-lg-4', 'col-md-6');

    const memberLink = document.createElement('a');
    memberLink.href = config.ourBandMembersLinks[i];

    const memberImg = document.createElement('img');
    memberImg.src = config.ourBandMembersPhotoPaths[i];
    memberImg.classList.add('center-block', 'img-fluid', 'my-3', 'shadowed');
    memberImg.width = 300;

    const memberName = document.createElement('h3');
    memberName.classList.add('mb-0');
    memberName.innerHTML = `<b>${config.ourBandMembersNames[i]}</b>`;

    const memberRole = document.createElement('p');
    memberRole.classList.add('text-muted');
    memberRole.textContent = config.ourBandMembersRoles[i];

    memberLink.appendChild(memberImg);
    memberLink.appendChild(memberName);
    memberLink.appendChild(memberRole);
    memberCol.appendChild(memberLink);
    bandMembers.appendChild(memberCol);
  }
}

async function updateCoverBackground() {
  const config = await fetchJSONFile('config.json');
  if (config.coverBackgroundGifEnabled) {
    const cover = document.getElementById('coverBackground2');
    cover.style.backgroundImage = `url(${config.coverBackgroundGifPath})`;
    cover.style.backgroundSize = 'cover';
    cover.style.backgroundRepeat = 'no-repeat';

    //cover.style.filter = 'brightness(170%)'; // Adjust the brightness percentage as needed
  }
}

async function updateCoverFansBackground() {
  const config = await fetchJSONFile('config.json');
  if (config.coverFansBackgroundGifEnabled) {
    const cover = document.getElementById('coverFansBackground2');
    cover.style.backgroundImage = `url(${config.coverFansBackgroundGifPath})`;
    cover.style.backgroundSize = 'cover';
    cover.style.backgroundRepeat = 'no-repeat';

    //cover.style.filter = 'brightness(170%)'; // Adjust the brightness percentage as needed
  }
}

/*async function updateVideosBackground() {
  const config = await fetchJSONFile('config.json');
          if (config.videoBackgroundGifEnabled) {
    const videos = document.getElementById('videos');
          videos.style.backgroundImage = `url(${config.videoBackgroundGifPath})`;
          videos.style.backgroundSize = 'cover';
          videos.style.backgroundRepeat = 'no-repeat';
          const container = document.getElementById("schedule");
          const pricingContainer = document.getElementById("pricingContainer");
          // Set the maximum height based on the device width
          if (window.innerWidth < 768) {
            // Mobile devices
            container.style.height = '600px'
      pricingContainer.style.marginTop = '0rem';
    } else {
            // Desktop devices
            container.style.height = '900px'; // Adjust as needed for your design
    }
  }
}*/
async function updateVideosBackground() {
  const config = await fetchJSONFile('config.json');
  console.log("config:", config);
  if (config.videoBackgroundGifEnabled) {
    const videos = document.getElementById('videosBackground');
    videos.style.backgroundImage = `url(${config.videoBackgroundGifPath})`;
    videos.style.backgroundSize = 'cover';
    videos.style.backgroundRepeat = 'no-repeat';
  }
}

async function updatePricingBackground() {
  const config = await fetchJSONFile('config.json');
  console.log("config:", config);

  const pricingBackground = document.getElementById('pricingBackground');
  pricingBackground.style.backgroundImage = `url(${config.ourPricingBackgroundGifPath})`;

  // Optionally, you can add a check to see if the background GIF is enabled
  if (!config.ourPricingBackgroundGifEnabled) {
    pricingBackground.style.backgroundImage = 'none'; // Remove background image
  }
}


async function updateEventsBackground() {
  const events = await fetchJSONFile('events.json');
  console.log("config:", events);

  const eventsBackground = document.getElementById('eventsBackground');
  eventsBackground.style.backgroundImage = `url(${events.eventBackgroundGifPath})`;

  // Optionally, you can add a check to see if the background GIF is enabled
  if (!events.eventBackgroundGifEnabled) {
    eventsBackground.style.backgroundImage = 'none'; // Remove background image
  }
}

async function MainEvents() {
  const facebookEvents = await checkEventPosts(accessToken);
  await populateEventsFromFacebook(facebookEvents);
  await populateEventsCarousel();
  updateEventsBackground();
}

// Call the function to populate the social links list
async function Main() {
  //updateBandName(); //Moved outside of this function to increase load time of the Band Name when users visit the page!
  //Update the Cover Picture Carousel!
  //await updateCoverCarousel();

  await updateCoverBackground();

  updateCoverFansBackground();

  updateVideosBackground();
  //Update Youtube Video Carousel!
  updateVideoCarousel();

  updateBandMembers();

  //Update Pricing!
  updatePricing();

  updatePricingBackground();

  //Update Sponsors!
  updateSponsors();

  //This will populate the regular social icon links such as facebook instagram etc..
  populateRegularSocialLinks();
  //This will populate additional social links
  populateSocialLinks();
  // This will populate your contact links!
  populateContactLinks();
}
Main();







/*
Facebook api tests!
*/
const accessToken = 'EAAN7GkZCkCvEBO4l00VJuHWmeT0gViZBWA8X9gLcfOcVGo2UZBZBnExMtf9UGajPSe0cEjSurL2QkiKZBgHYBQmeZCV6NLGSZApQzNS8UbpwOIA1dLaZBhpWFzwMbifFYqPTecyUmls1EzdDAJWWf7ePwRMDlleP1xboDwYX9ELsdnzGKOyOYaM5PHFd5GznDSYZD';
MainEvents();


async function checkAlbumPictures(accessToken) {
  try {
    let results = [];
    let nextPage = `https://graph.facebook.com/v19.0/me/feed?fields=privacy,attachments{media, media_type, subattachments}&access_token=${accessToken}`;

    for (let i = 0; i < 5; i++) {
      const response = await fetch(nextPage);
      const data = await response.json();
      //console.log('Response from facebook graph api', data);

      // Iterate over each post
      data.data.forEach(post => {
        // Check if the post is an album
        if (post.privacy.value === "EVERYONE" && post.attachments && post.attachments.data[0] && post.attachments.data[0].subattachments) {
          const subattachments = post.attachments.data[0].subattachments.data;
          // Check if the media types are pictures

          const allPictures = subattachments.every(attachment => attachment.type === "photo");
          if (allPictures) {
            console.log('We Have Sub Attachment Photos');
            subattachments.forEach(attachment => {
              if (attachment.type === "photo") {
                results.push({ id: post.id, pictureUrl: attachment.media.image.src });
              }
            });
          }
        }
      });

      // Check if there is a next page
      nextPage = data.paging && data.paging.next;
      if (!nextPage) break; // Exit the loop if there is no next page
    }

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function checkFanPictures(accessToken) {
  try {
    let results = [];
    let nextPage = `https://graph.facebook.com/v19.0/me/tagged?fields=permalink_url,full_picture,message&access_token=${accessToken}`;

    for (let i = 0; i < 5; i++) {
      const response = await fetch(nextPage);
      const data = await response.json();
      //console.log('Response from facebook graph api', data);

      // Iterate over each post
      data.data.forEach(post => {
        // Check if the post is an album
        if (post.permalink_url && post.full_picture && post.message && post.id) {
          console.log('Valid entry pushing fan picture!', post);
          results.push({ id: post.id, pictureUrl: post.full_picture, message: post.message });
          // Check if the media types are pictures
        }
      });

      // Check if there is a next page
      nextPage = data.paging && data.paging.next;
      if (!nextPage) break; // Exit the loop if there is no next page
    }

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function checkEventPosts(accessToken) {
  try {
    let results = [];
    let nextPage = `https://graph.facebook.com/v19.0/me/feed?fields=message,attachments{media_type, media, subattachments},privacy&access_token=${accessToken}`;

    for (let i = 0; i < 5; i++) {
      const response = await fetch(nextPage);
      const data = await response.json();
      //console.log('Response from facebook graph api', data);

      // Iterate over each post
      data.data.forEach(post => {
        // Check if the post contains an event message
        //        console.log('Post')
        if (post.message && post.message.includes("#Event")) {
          console.log('WE HAVE A SUCCESSFULL EVENT POST LETS GOOOOO!!', post);
          // Extract event details
          let event = {
            id: post.id,
            message: post.message,
            isEvent: true
          };

          // Check for address
          const addressMatch = post.message.match(/Address:(.*)/m);
          if (addressMatch) {
            event.address = addressMatch[1].trim();
          }

          // Check for date
          const dateMatch = post.message.match(/Date:(.*)/m);
          if (dateMatch) {
            event.date = dateMatch[1].trim();
          }

          // Check for ticket information
          if (post.message.includes("Tickets")) {
            event.hasTickets = true;

            const priceMatch = post.message.match(/TicketPrice:(.*)/m);
            if (priceMatch) {
              event.ticketPrice = priceMatch[1].trim();
            }

            const urlMatch = post.message.match(/TicketUrl:(.*)/m);
            if (urlMatch) {
              event.ticketUrl = urlMatch[1].trim();
            }
          }


          // Check for attached pictures
          if (post.attachments && post.attachments.data[0] && post.attachments.data[0].media_type === "photo") {
            event.pictureUrl = post.attachments.data[0].media.image.src;
          } else if (post.attachments && post.attachments.data[1] && post.attachments.data[1].media_type === "photo") {
            event.pictureUrl = post.attachments.data[1].media.image.src;
          }

          results.push(event);
        }
      });

      // Check if there is a next page
      nextPage = data.paging && data.paging.next;
      if (!nextPage) break; // Exit the loop if there is no next page
    }

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

checkFanPictures(accessToken).then(results => {
  //console.log('Results', results);
  const coverCarousel = document.getElementById('coverFansCarousel');
  coverCarousel.innerHTML = ''; // Clear existing carousel items
  var index = 0;
  for (const result of results) {
    //    console.log(result);
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    carouselItem.classList.add('flex-cover-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    index = index + 1;
    const img = document.createElement('img');
    img.src = result.pictureUrl;
    //img.classList.add('img-fluid');

    //img.classList.add('d-block', 'center-block');
    img.style.width = '75%';
    img.style.height = '100%';
    //img.classList.add('d-block', 'w-100'); // Set width and height to 50%
    img.style.maxHeight = '100%'; // Set maximum height to 50% of the viewport height


    img.alt = '...';

    /*    if (window.innerHeight > 768 && window.innerWidth < 768) {
            img.style.height = '45vh';
          img.style.maxHeight = '45vh';
        } else if (window.innerHeight > 768 && window.innerWidth > 768) {
            img.style.height = '65vh';
          img.style.maxHeight = '65vh';
        }
          */

    carouselItem.appendChild(img);
    coverCarousel.appendChild(carouselItem);
  }
});


checkAlbumPictures(accessToken).then(results => {
  const coverCarousel = document.getElementById('coverCarousel');
  coverCarousel.innerHTML = ''; // Clear existing carousel items
  var index = 0;
  for (const result of results) {
    //    console.log(result);
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    carouselItem.classList.add('flex-cover-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    index = index + 1;
    const img = document.createElement('img');
    img.src = result.pictureUrl;
    //img.classList.add('img-fluid');
    //    img.classList.add('d-block', 'center-block');
    img.style.width = '75%';
    img.style.height = '100%';
    //    img.classList.add('d-block', 'w-50', 'h-50'); // Set width and height to 50%
    img.style.maxHeight = '100%'; // Set maximum height to 50% of the viewport height
    img.alt = '...';
    /*
        if (window.innerHeight > 768 && window.innerWidth < 768) {
            img.style.height = '45vh';
          img.style.maxHeight = '45vh';
        } else if (window.innerHeight > 768 && window.innerWidth > 768) {
            img.style.height = '65vh';
          img.style.maxHeight = '65vh';
        }*/


    carouselItem.appendChild(img);
    coverCarousel.appendChild(carouselItem);
  }
  //console.log('How many album pictures are there?', results.length);
  //console.log(results);
});