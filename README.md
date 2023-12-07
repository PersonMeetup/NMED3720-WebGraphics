# Burnt Yet Doughy

*Burnt Yet Doughy* is a minigame built using the [P5 library](https://p5js.org/) that focuses on the act of cooking pancakes. In it, the user simply needs to keep track of pancakes as they cook on the pan. With no way to keep track of how long the pancakes need, the user must find their own way to measure time using what's available in the kitchen.

Simple in concept, the game is focused on the idea of how we perceive relative time. More specifically, it toys with the concept of how “the watched pot never boils” and the inverse of that idea (i.e. looking away for a second only to find it's boiling over). As I've been finding through my own work, time only gets a sense of consistency once you start to measure it through some medium. In the case of the game, that medium would be the rhythm of the player hitting the stove.

---

Building off of the P5 library was a surprisingly mixed experience. While the library's overall simplicity made porting the functionality of my HTML Element prototypes streamlined in some ways, in others it led to further implementation development to ensure the functionality worked. Sometimes these frustrations were minor, like how functions from the `p5.Element` class could only be used on objects of its inheritance. Other times, I'd be left to develop click detection for the elements within the canvas. 

Documentation was similarly mixed, although definitely more positively leaning. Since many of the functions within Processing/P5 are explicitly named based on their purpose, a quick keyword search of the library's reference always turned up what I was looking for. In most cases that was all I needed, and I could overlook how bare bones many of the reference pages are. External resources were often needed in order to fill out these gaps, like the tutorials from [The Coding Train](https://www.youtube.com/watch?v=TaN5At5RWH8&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA) and [Happy Coding](https://happycoding.io/tutorials/processing/collision-detection) that covered click detection.

Overall, I'd say P5 inherits many of the praises and problems that make up Processing. They're incredibly simple and easy to use, but digging deeper reveals the limits of the libraries fairly quickly.