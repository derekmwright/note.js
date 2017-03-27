/**
 * @author derekmwright / http://github.com/derekmwright
 */

// Optional: provide a MIDI note value, otherwise value is MIDI 0
function Note(value) {
    // Set default if param is empty
    value = value || 0;

    // Use this to setup the note object, parseObject relies on this for updating the object
    this.update = function() {
        if (this.value < 0) {
            this.value = 0; // Protect against negative integers
        }
        if (this.value == 0) {
            this.octave = -5;
        } else {
            this.octave = Math.floor(this.value / 12) - 5;
        }
        this.frequency = getFrequency(this.value);
    }

    // Convert the note information to its relative frequency
    function getFrequency(value) {
        base = Math.pow(2, (1/12));
        return parseFloat((220 * Math.pow(base, value - 57)).toFixed(8))
    }

    this.type = 'note';
    this.value = value;
    this.duration = 0; // TODO
    this.velocity = 0; // TODO

    // Update the object after setting the value
    this.update();

    return this;
}

Object.assign( Note.prototype, {
    // set the Object Type
    isNote: true,
    noteMap: function() {
        return ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    },
    // humanize returns human readable name of the note
    humanize: function() {
        return this.noteMap()[this.value % 12]+this.octave;
    },
    humanizeAll: function() {
        return {
            name: this.noteMap()[this.value % 12],
            octave: this.octave
        };
    },
    // parse converts a human readable string representation of a note into a note object
    parse: function(str) {
        var regex = /([a-gA-G]{1}#?)(-?[0-5]{1})/;
        var result = regex.exec(str);
        if (!result) {
            throw 'invalid note string, use <note name><octave>, example: A#-1';
        } else {
            return this.parseObject({name: result[1], octave: result[2]});
        }
    },
    // parseObject parses and object into a note object, { name: String, octave: Integer }
    parseObject: function(obj) {
        var name_regex = /[a-gA-G]{1}#?/;
        var octv_regex = /-?[0-5]{1}/;
        var name = name_regex.exec(obj.name);
        var octv = octv_regex.exec(obj.octave);
        if(!name || !octv) {
            throw 'invalid object passed, must have name and octave: { name: String, octave: Integer }'
        } else {
            var octave = (Number((obj.octave)) + 5) * 12;
            var note = this.noteMap().indexOf(obj.name.toUpperCase())
            this.value = octave + note;
            this.update();
            return this;
        }
    },
    transpose: function(steps) { this.value = this.value + steps; this.update(); return this; }, // in steps
    decodeMidi: function() {} // TODO: implement
})