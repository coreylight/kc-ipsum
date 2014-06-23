# Kansas City Ipsum

A data-driven lorem-ipsum generator outputting your favorite Kansas City-based verbage for use in all of your projects. Live project [here](http://kc-ipsum.coreylight.com).

The repo features the Node.js + Casper.js files used to make this generator, and the generator itself.

To get started, use and/or modify node/scraper.js to fit your needs. You'll also need to install Phantom.js and Casper.js to actually scrape whatever you'd like.

After using the scraper, you'll end up with a bunch of .json files. You'll use node/parser.js to iterate through all of the words you capture and generate a frequency file, informing you of what words were used the most throughout your data.

Plug your data into index.html and js/script.js, modifying additional data structures as needed, and you'll have your own data-driven generator!