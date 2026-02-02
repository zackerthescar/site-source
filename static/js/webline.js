var links = [
    "https://schare.space",
    "https://kaianew.github.io",
    "https://minizou.dev/blog",
    "https://olive.meownik.com/about",
    "https://keltono.net"
];

function weblineWarp() {
    var randIdx = Math.floor(Math.random() * links.length);
    var link = links[randIdx];
    window.open(link, "_self");
}
