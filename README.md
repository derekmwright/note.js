# Usage

Initialize without a default value:

    note = new Note();


Initialize with a default value:

    note = new Note(57);


Printing Note Information in Human Terms:

    note = new Note(57);
    note.humanize();
    > "A-1"

Transposing a note:

    note = new Note(57);
    note.humanize();
    > "A-1"
    note.transpose(2);
    note.humanize();
    > "B-1"

Get Frequency of the note for use in Synthesis:

    note = new Note(34);
    note.frequency
    > 58.27047019

Parsing Note Information:

    note.parse("c#2")
    note.value
    > 85
    note.humanize();
    > "C#2"

# TODO

 - [ ] Handle passing MIDI data to note
 - [ ] Set note velocity generic or from MIDI
 - [ ] Set note duration generic or from MIDI

# Contributions

Fork it and send me a PR!