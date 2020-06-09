
var motto = [
    "veni, vidi, vici",
    "I think therefore I am",
    "carpe diem"
];


exports.getMotto = () => {
    var idx = motto[Math.floor(Math.random() * motto.length)];
    return motto[idx];
}