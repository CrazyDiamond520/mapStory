const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const storySchema = new Schema({
    title: {type: String, required: true},
    description: String,
    events: []
})


const Story = mongoose.model('Story', storySchema);
module.exports = Story;