
class APIManager{
    constructor(){
        this.stories = []
        this.story = null //should reference to object story
        this.countries = [];
        this.searchResults = [];
        this.location = {address: ''};
        this.zoomBounds = {}
    }
    //event {title, description, longitude, latitude, photos}
    async getStories(){
        const stories = await $.get('/stories')
        this.stories = stories
    }
    async createEvent(fd){
      //
      try{
        const eventfromDB = await $.ajax({//come and change it 
        url: `/event/${this.story.title}`,
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        // success: function (response) {
        //   if (response) {
        //     $("#img").append(`<img src="${response.avatar}" alt="photo">`)
        //   } else {
        //     alert("file not uploaded");
        //   }
        // },
      });
      this.story.events.push(eventfromDB)

      }catch(err){
        console.log(err)
      }
    
      //
        // await $.ajax({
        //     method: "post",
        //     url: `/event/${this.story.title}`,
        //     data: event
        //   })
    }
    async deleteEvent(eventTitle){
        await $.ajax({
            method: "delete",
            url: `/event/${this.story.title}/${eventTitle}`,//something to write     
          })
        const eventIndex = this.story.events.findIndex(e => e.title === eventTitle)
        this.story.events.splice(eventIndex, 1)
    }
    async updateEvent(event, update){
        //update is {parameterTitle : value of text input , ...}
    }
    connectStory = storyTitle =>{ this.story = this.stories.find(s => s.title === storyTitle)}
    //story {title, description, events}
    async createStory(story){
      if (this.stories.some(s => s.title === story.title)) {
          renderer.sameStoryError();
          return;
      }
        story.events = []
        await $.ajax({
            method: "post",
            url: '/story',
            data:story
          })
          this.stories.push(story)
          this.story = this.stories[this.stories.length -1]
    }
    updateStory(param, update){}


  searchEvent = (latlng) =>
    {return this.story.events.find(
      (e) => e.longtitude == latlng.lng && e.latitude == latlng.lat
    )}

  async getCountries() {
    const countriesList = await $.get("/countries");
    countriesList.forEach((c) => this.countries.push(c));
  }

  async getResults(country, address) {
    const results = await $.get(`/search/${address}/${country}`);
    // results.forEach(r => this.searchResults.push(r));
    this.searchResults = results;
  }


 
    async getResults(country, address) {
        const results = await $.get(`/search/${address}/${country}`);
        this.searchResults = results;
    }

    async getAddress(lat, lng) {
        const address = await $.get(`/address/${lat}/${lng}`);
        this.location.address = address;
    }

    async zoomOnCountry(country) {
        const bounds = await $.get(`/bounds/${country}`);
        this.zoomBounds = bounds;
    }
    
    async deleteStory(storyTitle){
        await $.ajax({
            method: "delete",
            url: `/story/${storyTitle}`,//something to write     
          })
          const storyIndex = this.stories.findIndex(s => s.title === storyTitle)
          this.stories.splice(storyIndex, 1)
    }

}

